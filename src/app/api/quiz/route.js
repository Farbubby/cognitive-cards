import { NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

//Initialize supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

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

    //gets userid from clerk auth
    const auth = getAuth(req)
    const userid = auth.userId

    if(!userid){
        return NextResponse.json({ error : 'User not authenticated' },
            {status : 401})
    }

    const completion = await openai.chat.completions.create({ 
        messages: [
            { role: "system", content: systemPrompt},
            { role: "user", content: data}
        ],
        model: "gpt-4o",
        response_format: { type: 'json_object' },
    });

    const quizQuestions = JSON.parse(completion.choices[0].message.content)

    // Insert flashcards into Supabase (rn RLS on supabase is off)
    const { data: insertedData, error } = await supabase
    .from('quizzes')
    .upsert({
        userid: userid,
        quizQuestions: quizQuestions
    })

    if (error) {
        console.error('Error inserting quiz questions:', error)
        return NextResponse.json({ error: 'Failed to save quiz questions' }, { status: 500 })
    }

    return NextResponse.json(quizQuestions)

}


