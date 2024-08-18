interface McqCardProps {
  question: string;
  options: string[];
  answer: string;
}

export default function McqCard({ question, options, answer }: McqCardProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg text-black w-fit">
      <div>{question}</div>
      <div>
        {options.map((option, index) => (
          <div key={index}>{option}</div>
        ))}
      </div>
      <div>Answer: {answer}</div>
    </div>
  );
}
