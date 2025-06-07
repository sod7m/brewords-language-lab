import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FlashCardProps {
  flashCard: {
    front: string;
    back: string;
  };
}

const FlashCard: React.FC<FlashCardProps> = ({ flashCard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped((prev) => !prev);

  return (
    <div
      className="flip-card w-full h-48 sm:h-56 md:h-64 cursor-pointer"
      onClick={handleFlip}
    >
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        {/* Front side - English */}
        <Card className="flip-card-front absolute w-full h-full bg-gradient-to-br from-brewords-blue to-brewords-accent text-white border-0">
          <CardContent className="flex items-center justify-center h-full p-4 sm:p-6 md:p-8">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {flashCard.front}
              </h2>
              <p className="text-sm opacity-80">Натисніть для перекладу</p>
            </div>
          </CardContent>
        </Card>

        {/* Back side - Ukrainian */}
        <Card className="flip-card-back absolute w-full h-full bg-gradient-to-br from-brewords-blue-dark to-brewords-blue text-white border-0">
          <CardContent className="flex items-center justify-center h-full p-4 sm:p-6 md:p-8">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {flashCard.back}
              </h2>
              <p className="text-sm opacity-80">Натисніть знову</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlashCard;
