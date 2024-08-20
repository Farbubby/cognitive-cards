import { Button } from "@mui/material";
import FlashCardsList from "./flashcard-list";
import Link from "next/link";
import LinkButton from "@/components/link-button";

const parseTopic = (topic: string) => {
  return topic.replaceAll("%20", " ");
};

export default function Home({ params }: { params: { topic: string } }) {
  const topic = parseTopic(params.topic);
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-4">
          <LinkButton href="/" text={"Back to home"} />
          <LinkButton href="/cards" text="Back to topics" />
        </div>
        <div className="text-4xl font-bold text-center">{topic}</div>
        <FlashCardsList topic={topic} />
      </div>
    </>
  );
}
