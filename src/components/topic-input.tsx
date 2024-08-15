"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { addTopic } from "@/server/topic/add";
import { useState } from "react";

export default function TopicInput() {
  const queryClient = useQueryClient();
  const [topic, setTopic] = useState("");

  const mutation = useMutation({
    mutationFn: (topic: string) => addTopic(topic),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });

  return (
    <>
      <div>
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(topic);
          }}>
          <label className="font-bold text-base">Pick a topic</label>
          <div className="flex flex-row gap-4">
            <input
              type="text"
              className="p-2 shadow-lg rounded-lg w-1/2"
              placeholder="Cells"
              onChange={(e) => setTopic(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg">
              Submit
            </button>
          </div>
          {mutation.isPending && <div>Loading...</div>}
          <div className="text-gray-700 text-sm font-bold">
            Tip: Narrow your topic to get specific questions!
          </div>
        </form>
      </div>
    </>
  );
}
