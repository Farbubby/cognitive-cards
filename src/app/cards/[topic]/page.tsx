export default function Home({ params }: { params: { topic: string } }) {
  return <>Hi {params.topic}</>;
}
