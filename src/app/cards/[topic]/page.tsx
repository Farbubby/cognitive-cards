import { Button } from "@mui/material";
import FlashCards from "./flash-cards";
import Link from "next/link";

export default function Home({ params }: { params: { topic: string } }) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <Link href="/cards" className="w-fit">
          <Button className="bg-white text-black py-2 px-4 rounded-lg">
            Back
          </Button>
        </Link>
        <Link href="/" className="w-fit">
          <Button className="bg-white text-black py-2 px-4 rounded-lg">
            Home
          </Button>
        </Link>
        <div className="text-4xl font-bold">{params.topic}</div>
        <FlashCards topic={params.topic} />
      </div>
    </>
  );
}
