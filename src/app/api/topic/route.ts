import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { authError: "Unauthorized, please log in" },
      { status: 401 }
    );
  }

  const supabase = createClient();

  const { topic } = (await req.json()) as { topic: string };

  if (!topic) {
    return NextResponse.json(
      { fieldError: "Topic cannot be empty" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("topics")
    .insert({ user_id: user.id, topic_name: topic })
    .select();

  if (error) {
    return NextResponse.json(
      { error, dbError: "Failed to create topic" },
      { status: 500 }
    );
  }

  return NextResponse.json({ topic: data, success: "Topic created" });
}

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { authError: "Unauthorized, please log in" },
      { status: 401 }
    );
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("topics")
    .select()
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json(
      { error, dbError: "Failed to fetch topics" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    topics: data,
    success: "Topics fetched for the user",
  });
}
