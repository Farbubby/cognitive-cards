"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function TopicInput() {
  const queryClient = useQueryClient();
  const [topic, setTopic] = useState("");

  const mutation = useMutation({
    mutationFn: (topic: string) =>
      fetch("/api/topic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      }).then(
        (res) =>
          res.json() as Promise<{
            authError: string;
            dbError: string;
            fieldError: string;
            success: string;
          }>
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });

  const handleInput = () => {
    mutation.mutate(topic);
    setTopic("");
  };

  return (
    <>
      <div className="flex">
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleInput();
          }}>
          <label className="font-bold text-base">Pick a topic</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              className="p-2 shadow-lg rounded-lg w-full"
              placeholder="Cells"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg sm:w-1/6">
              {mutation.isPending ? (
                <svg
                  className="animate-spin h-5 w-5 fill-white mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24">
                  <path d="M8.177 7.376l-3.042-5.268 1.731-1 3.044 5.273c-.634.237-1.221.571-1.733.995zm-2.177 4.624c0-.341.035-.674.09-1h-6.09v2h6.09c-.055-.326-.09-.659-.09-1zm1.377-3.824l-5.269-3.042-1 1.732 5.273 3.044c.237-.635.572-1.222.996-1.734zm8.447-.799l3.043-5.271-1.731-.999-3.046 5.275c.635.236 1.222.571 1.734.995zm1.795 2.534l5.276-3.046-1.001-1.731-5.27 3.042c.424.513.758 1.1.995 1.735zm-5.619-3.911c.341 0 .674.035 1 .09v-6.09h-2v6.09c-.326-.055-.659-.09-1-.09zm2.09 11.618l3.045 5.274 1.731-1-3.042-5.27c-.512.425-1.099.76-1.734.996zm-7.708-3.528l-5.272 3.044 1 1.732 5.268-3.042c-.425-.512-.76-1.099-.996-1.734zm11.528-3.09c.055.326.09.658.09 1s-.035.674-.09 1h6.09v-2h-6.09zm-1.286 4.823l5.27 3.043.999-1.732-5.274-3.045c-.237.635-.571 1.222-.995 1.734zm-8.447.801l-3.041 5.268 1.732 1 3.044-5.272c-.635-.237-1.223-.572-1.735-.996zm3.823 1.376c-.341 0-.674-.035-1-.09v6.09h2v-6.09c-.326.055-.659.09-1 .09z" />
                </svg>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          {mutation.data?.authError && (
            <div className="text-sm text-red-700 font-bold">
              {mutation.data.authError}
            </div>
          )}
          {mutation.data?.fieldError && (
            <div className="text-sm text-red-700 font-bold">
              {mutation.data.fieldError}
            </div>
          )}
          {mutation.data?.dbError && (
            <div className="text-sm text-red-700 font-bold">
              {mutation.data.dbError}
            </div>
          )}
          {mutation.data?.success && (
            <div className="text-sm text-green-700 font-bold">
              {mutation.data.success}
            </div>
          )}
          <div className="text-gray-700 text-sm font-bold">
            Tip: Narrow your topic to get specific questions!
          </div>
        </form>
      </div>
    </>
  );
}
