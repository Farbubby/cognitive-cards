import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@/supabase/server";
import OpenAI from "openai";

//Give chatgpt api a prompt for api call
const systemPrompt = `
You are a flashcard creator, you take in terms and create multiple flashcards from it. Make sure to create exactly 10 unique flashcards.
The front should be the term and the back should be the 40 word definition of the term.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
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
      { error: "Failed to generate flashcards" },
      { status: 500 }
    );
  }

  const flashcards = JSON.parse(completion.choices[0].message.content) as {
    flashcards: {
      front: string;
      back: string;
    }[];
  };

  // Insert flashcards into Supabase (rn RLS on supabase is off)
  const { data, error } = await supabase
    .from("flashcards")
    .upsert({
      userid: user.id,
      topic,
      flashcards,
    })
    .select();

  if (error) {
    console.error("Error inserting flashcards:", error);
    return NextResponse.json(
      { error: "Failed to save flashcards" },
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
    .from("flashcards")
    .select("flashcards")
    .eq("userid", user.id)
    .eq("topic", topic);

  if (error) {
    return NextResponse.json(
      { dbError: "Failed to fetch flashcards" },
      { status: 500 }
    );
  }

  return NextResponse.json({ result: data });
}
