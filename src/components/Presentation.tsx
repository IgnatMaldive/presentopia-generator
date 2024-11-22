import { useState } from "react";
import { Slide } from "./Slide";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PresentationProps {
  slides: string[];
  onClose: () => void;
}

export const Presentation = ({ slides, onClose }: PresentationProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black">
      {slides.map((slide, index) => (
        <Slide
          key={index}
          text={slide}
          imageIndex={index}
          isActive={index === currentSlide}
        />
      ))}
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousSlide}
          disabled={currentSlide === 0}
          className="bg-black/50 hover:bg-black/70 text-white border-white/20"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <span className="text-white/80 text-sm">
          {currentSlide + 1} / {slides.length}
        </span>
        
        <Button
          variant="outline"
          size="icon"
          onClick={goToNextSlide}
          disabled={currentSlide === slides.length - 1}
          className="bg-black/50 hover:bg-black/70 text-white border-white/20"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Button
        variant="outline"
        onClick={onClose}
        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white border-white/20"
      >
        Close
      </Button>
    </div>
  );
};