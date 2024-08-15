import Link from "next/link";

interface TopicProps {
  topic: string;
}

export default function TopicButton({ topic }: TopicProps) {
  return (
    <>
      <Link
        href={`/cards/${topic}`}
        className="bg-white text-black rounded-lg px-8 py-2 font-bold shadow-lg">
        {topic}
      </Link>
    </>
  );
}
