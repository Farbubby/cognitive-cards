import { NextResponse } from 'next/server'
import OpenAI from 'openai'

//Same functionality of generate route.js but for making mc quiz questions and answers
const systemPrompt = 
`
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
`

export async function POST(req) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const data = await req.text()

    const completion = await openai.chat.completions.create({ 
        messages: [
            { role: "system", content: systemPrompt},
            { role: "user", content: data}
        ],
        model: "gpt-4o",
        response_format: { type: 'json_object' },
    });

    const quizQuestions = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(quizQuestions)

}


