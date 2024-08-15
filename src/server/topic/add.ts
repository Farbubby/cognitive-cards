"use server";

import { createClient } from "@/supabase/server";
import { currentUser } from "@clerk/nextjs/server";

export async function addTopic(topic: string) {
  const user = await currentUser();
  const supabase = createClient();

  if (!user) {
    return {
      topics: null,
      error: "Womp womp",
      message: "Unauthorized, please log in",
    };
  }

  const { data, error } = await supabase
    .from("topics")
    .insert({ user_id: user.id, topic })
    .select();

  if (error) {
    return {
      topics: null,
      error,
      message: "Failed to create topic",
    };
  }

  return {
    topics: data,
    error: null,
    message: "Topic created",
  };
}
