"use server";

import { createClient } from "@/supabase/server";
import { currentUser } from "@clerk/nextjs/server";

export async function addTopic(topic: string) {
  const user = await currentUser();
  const supabase = createClient();

  if (!user) {
    return {
      topics: [],
      authError: "Unauthorized, please log in",
    };
  }

  if (!topic) {
    return {
      topics: [],
      fieldError: "Topic cannot be empty",
    };
  }

  const { data, error } = await supabase
    .from("topics")
    .insert({ user_id: user.id, topic_name: topic })
    .select();

  if (error) {
    return {
      topics: [],
      error,
      dbError: "Failed to create topic",
    };
  }

  return {
    topics: data,
    success: "Topic created",
  };
}
