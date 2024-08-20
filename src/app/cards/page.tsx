import TopicInput from "@/components/topic-input";
import TopicList from "@/components/topic-list";
import LinkButton from "@/components/link-button";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-20">
        <LinkButton href="/" text={"Back to home"} />
        <TopicInput />
        <TopicList />
      </div>
    </>
  );
}
