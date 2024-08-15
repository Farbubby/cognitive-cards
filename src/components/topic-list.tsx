"use client";

import { useQuery } from "@tanstack/react-query";
import TopicButton from "./topic-button";
import { getAllTopics } from "@/server/topic/getAll";

export default function TopicList() {
  const query = useQuery({
    queryKey: ["topics"],
    queryFn: () => getAllTopics(),
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.error) {
    return <div>Error: {query.error.message}</div>;
  }

  if (!query.data) {
    return <div>Something went wrong</div>;
  }

  if (!query.data.topics) {
    return <div>Add a topic!</div>;
  }

  const topicsList = query.data.topics.map(
    (val: { id: string; topic_name: string }) => (
      <TopicButton key={val.id} topic={val.topic_name} />
    )
  );

  return (
    <>
      <div>{topicsList}</div>
    </>
  );
}
