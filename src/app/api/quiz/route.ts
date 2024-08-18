import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@/supabase/server";
import OpenAI from "openai";

//Same functionality of generate route.js but for making mc quiz questions and answers
const systemPrompt = `
You are a quiz creator. Given a piece of text, generate exactly 10 unique multiple-choice questions based on the most important information from the text. Each question should have four answer choices and one correct answer. Make sure that each question is unique.

Return the questions in the following JSON format:
{
    "questions": [
        {
            "prompt": "What is the color of the sky?",
            "choices": [
                {"id": "a", "content": "Red"},
                {"id": "b", "content": "Blue"},
                {"id": "c", "content": "Green"},
                {"id": "d", "content": "Pink"}
            ],
            "answer": [["b"]]
        }
        // Include 9 more unique questions
    ]
}
`;

export async function POST(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { authError: "Unauthorized, please log in" },
      { status: 401 }
    );
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const supabase = createClient();
  const { topic } = (await req.json()) as { topic: string };

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: topic },
    ],
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });

  if (!completion.choices[0].message.content) {
    return NextResponse.json(
      { error: "Failed to generate quiz questions" },
      { status: 500 }
    );
  }

  const quizQuestions = JSON.parse(completion.choices[0].message.content) as {
    questions: {
      prompt: string;
      choices: {
        id: string;
        content: string;
      }[];
      answer: string[][];
    }[];
  };

  // Insert flashcards into Supabase (rn RLS on supabase is off)
  const { data, error } = await supabase
    .from("quizzes")
    .upsert({
      userid: user.id,
      topic,
      quizQuestions: quizQuestions,
    })
    .select();

  if (error) {
    console.error("Error inserting quiz questions:", error);
    return NextResponse.json(
      { error: "Failed to save quiz questions" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function GET(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { authError: "Unauthorized, please log in" },
      { status: 401 }
    );
  }

  const supabase = createClient();
  const topic = req.nextUrl.searchParams.get("topic");

  if (!topic) {
    return NextResponse.json(
      { fieldError: "Topic cannot be empty" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("quizzes")
    .select("quizQuestions")
    .eq("userid", user.id)
    .eq("topic", topic);

  if (error) {
    return NextResponse.json(
      { dbError: "Failed to fetch quiz questions" },
      { status: 500 }
    );
  }

  return NextResponse.json({ result: data });
}
