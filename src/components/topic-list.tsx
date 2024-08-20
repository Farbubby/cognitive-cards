"use client";

import { useQuery } from "@tanstack/react-query";
import TopicButton from "./topic-button";

export default function TopicList() {
  const query = useQuery({
    queryKey: ["topics"],
    queryFn: () =>
      fetch("/api/topic").then(
        (res) =>
          res.json() as Promise<{
            topics: any[];
            authError: string;
            dbError: string;
          }>
      ),
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

  if (query.data.authError) {
    return <div>{query.data.authError}</div>;
  }

  if (query.data.dbError) {
    return <div>{query.data.dbError}</div>;
  }

  if (query.data.topics.length === 0) {
    return <div>Add a topic!</div>;
  }

  const topicsList = query.data.topics.map(
    (val: { id: string; topic_name: string }) => (
      <TopicButton key={val.id} topic={val.topic_name} />
    )
  );

  return (
    <>
      <div className="grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-4">
        {topicsList}
      </div>
    </>
  );
}
