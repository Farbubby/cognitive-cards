import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const systemPrompt = `
You are a flashcard creator, you take in terms and create multiple flashcards from it. Make sure to create exactly as many flashcards as there are terms.
The front should be the term and the back should be the single sentence definition of the term.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()
  
    const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: data },
        ],
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
      })

      // Parse the JSON response from the OpenAI API
      const flashcards = JSON.parse(completion.choices[0].message.content)
    
      // Return the flashcards as a JSON response
      return NextResponse.json(flashcards.flashcards)
  }