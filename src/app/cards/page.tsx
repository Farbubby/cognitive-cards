import TopicInput from "@/components/topic-input";
import TopicList from "@/components/topic-list";
import LinkButton from "@/components/link-button";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-20">
        <LinkButton href="/" text={"Back to home"} />
        <TopicInput />
        <TopicList />
      </div>
      <Footer />
    </>
  );
}
