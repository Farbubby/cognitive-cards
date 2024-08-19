import { useState } from "react";

interface FlashCardProps {
  front: string;
  back: string;
}

export default function FlashCard({ front, back }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`relative w-64 h-40 cursor-pointer transition-transform transform ${
        isFlipped ? "rotate-y-180" : ""
      }`}
      onClick={handleFlip}
    >
      <div className="absolute inset-0 w-full h-full">
        <div
          className={`w-full h-full bg-white rounded-lg shadow-lg text-black flex items-center justify-center p-4 ${
            isFlipped ? "hidden" : "block"
          }`}
        >
          {front}
        </div>
        <div
          className={`w-full h-full bg-white rounded-lg shadow-lg text-black flex items-center justify-center p-4 ${
            isFlipped ? "block" : "hidden"
          } rotate-y-180`}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
