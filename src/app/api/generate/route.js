import { NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

//Initialize supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

//Give chatgpt api a prompt for api call
const systemPrompt = `
You are a flashcard creator, you take in terms and create multiple flashcards from it. Make sure to create exactly as many flashcards as there are terms.
The front should be the term and the back should be the 40 word definition of the term.
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

    //gets userid from clerk auth
    const auth = getAuth(req)
    const userid = auth.userId

    if(!userid){
        return NextResponse.json({ error : 'User not authenticated' },
            {status : 401})
    }

    //console.log('getuserid api value: ' + userid)

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

      // Insert flashcards into Supabase (rn RLS on supabase is off)
      const { data: insertedData, error } = await supabase
      .from('flashcards')
      .upsert({
          userid: userid,
          flashcards: flashcards.flashcards
      })

      if (error) {
          console.error('Error inserting flashcards:', error)
          return NextResponse.json({ error: 'Failed to save flashcards' }, { status: 500 })
      }
    
      // Return the flashcards as a JSON response
      return NextResponse.json(flashcards.flashcards)
  }