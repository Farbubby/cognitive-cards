"use server";

import { createClient } from "@/supabase/server";
import { currentUser } from "@clerk/nextjs/server";

export async function getAllTopics() {
  const user = await currentUser();
  const supabase = createClient();

  if (!user) {
    return {
      topics: [],
      authError: "Unauthorized, please log in",
    };
  }

  const { data, error } = await supabase
    .from("topics")
    .select()
    .eq("user_id", user.id);

  if (error) {
    return {
      topics: [],
      error,
      dbError: "Failed to fetch topics",
    };
  }

  return {
    topics: data,
    success: "Topics fetched",
  };
}
