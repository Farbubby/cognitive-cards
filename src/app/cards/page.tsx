import TopicInput from "@/components/topic-input";
import TopicList from "@/components/topic-list";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-20">
        <TopicInput />
        <TopicList />
      </div>
    </>
  );
}
