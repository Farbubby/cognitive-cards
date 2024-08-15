"use client";

import { useQuery } from "@tanstack/react-query";
import TopicButton from "./topic-button";
import { getAllTopics } from "@/server/topic/getAll";

export default function TopicList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["topics"],
    queryFn: () => getAllTopics(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Something went wrong</div>;
  }

  if (!data.topics) {
    return <div>Add a topic!</div>;
  }

  const topicsList = data.topics.map((val: any) => (
    <TopicButton key={val.id} topic={val} />
  ));

  return (
    <>
      <div>{topicsList}</div>
    </>
  );
}
