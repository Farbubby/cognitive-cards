"use client";

import { useQuery } from "@tanstack/react-query";

export default function Home({ params }: { params: { topic: string } }) {
  const query = useQuery({
    queryKey: ["quiz", params.topic],
    queryFn: () =>
      fetch(`/api/quiz/?topic=${params.topic}`).then(
        (res) =>
          res.json() as Promise<{
            quizQuestions: {
              questions: {
                prompt: string;
                choices: {
                  id: string;
                  content: string;
                }[];
                answer: string[][];
              }[];
            };
            authError: string;
            dbError: string;
          }>
      ),
  });

  if (query.isLoading) return <>Loading...</>;

  if (query.error) {
    return <>Error: {query.error.message}</>;
  }

  if (!query.data) {
    return <>Something went wrong</>;
  }

  if (query.data.authError) {
    return <>{query.data.authError}</>;
  }

  if (query.data.dbError) {
    return <>{query.data.dbError}</>;
  }

  if (query.data.quizQuestions.questions.length === 0) {
    return <>Generate some questions!</>;
  }

  const quizQuestions = query.data.quizQuestions.questions.map((question) => {
    const choices = question.choices.map((choice) => (
      <>
        <div>
          {choice.id}. {choice.content}
        </div>
      </>
    ));
    return (
      <>
        <div className="text-black flex flex-col gap-4">
          <div>{question.prompt}</div>
          <div>{choices}</div>
          <div>Answer: {question.answer}</div>
        </div>
      </>
    );
  });

  return <>{quizQuestions}</>;
}
