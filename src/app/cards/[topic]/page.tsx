"use client";

import { useQuery } from "@tanstack/react-query";
import McqCard from "@/components/mcq-card";
import FlashCard from "@/components/flash-card";

export default function Home({ params }: { params: { topic: string } }) {
  // const query = useQuery({
  //   queryKey: ["quiz", params.topic],
  //   queryFn: () =>
  //     fetch(`/api/quiz/?topic=${params.topic}`).then(
  //       (res) =>
  //         res.json() as Promise<{
  //           result: {
  //             quizQuestions: {
  //               questions: {
  //                 prompt: string;
  //                 choices: {
  //                   id: string;
  //                   content: string;
  //                 }[];
  //                 answer: string[][];
  //               }[];
  //             };
  //           }[];
  //           authError: string;
  //           dbError: string;
  //         }>
  //     ),
  // });

  const query = useQuery({
    queryKey: ["flashcards", params.topic],
    queryFn: () =>
      fetch(`/api/generate/?topic=${params.topic}`).then(
        (res) =>
          res.json() as Promise<{
            result: {
              flashcards: {
                flashcards: {
                  front: string;
                  back: string;
                }[];
              };
            }[];
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

  if (!query.data.result) {
    return <>Something went wrong</>;
  }

  if (query.data.result.length === 0) {
    return <>Generate some questions!</>;
  }

  // const quizQuestions = query.data.result[0].quizQuestions.questions.map(
  //   (question) => {
  //     const choices = question.choices.map((choice) => {
  //       return choice.id + ". " + choice.content;
  //     });
  //     return (
  //       <>
  //         <McqCard
  //           question={question.prompt}
  //           options={choices}
  //           answer={question.answer[0][0]}
  //         />
  //       </>
  //     );
  //   }
  // );

  const flashcards = query.data.result[0].flashcards.flashcards.map(
    (flashcard) => {
      return (
        <>
          <FlashCard front={flashcard.front} back={flashcard.back} />
        </>
      );
    }
  );

  return (
    <>
      <div className="flex flex-col gap-4">{flashcards}</div>
    </>
  );
}
