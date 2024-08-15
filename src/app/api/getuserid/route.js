import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET(req){
    const auth = getAuth(req)
    const userid = auth.userId

    console.log('getuserid api value: ' + userid)
    
    if(!userid){
        return NextResponse.json({ error : 'User not authenticated' },
            {status : 401})
    }
    
    return NextResponse.json({userid})
}