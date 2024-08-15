import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET() {
  const user = await currentUser();
  const supabase = createClient();

  if (!user) {
    return NextResponse.json({
      topics: null,
      error: null,
      message: "Unauthorized, please log in",
    });
  }

  const { data, error } = await supabase
    .from("topics")
    .select()
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({
      topics: null,
      error,
      message: "Failed to fetch topics",
    });
  }

  return NextResponse.json({
    topics: data,
    error: null,
    message: "Topics fetched",
  });
}

export async function POST(req: NextRequest) {
  const user = await currentUser();
  const supabase = createClient();

  if (!user) {
    return NextResponse.json({
      topics: null,
      error: null,
      message: "Unauthorized, please log in",
    });
  }

  const { topic } = (await req.json()) as { topic: string };

  const { data, error } = await supabase
    .from("topics")
    .insert({ user_id: user.id, topic })
    .select();

  if (error) {
    return NextResponse.json({
      topics: null,
      error,
      message: "Failed to create topic",
    });
  }

  return NextResponse.json({
    topics: data,
    error: null,
    message: "Topic created",
  });
}
