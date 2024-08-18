interface FlashCardProps {
  front: string;
  back: string;
}

export default function McqCard({ front, back }: FlashCardProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg text-black w-fit">
      <div>{front}</div>
      <div>Answer: {back}</div>
    </div>
  );
}
