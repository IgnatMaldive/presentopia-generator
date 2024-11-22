import { useEffect, useState } from "react";

interface SlideProps {
  text: string;
  imageIndex: number;
  isActive: boolean;
}

export const Slide = ({ text, imageIndex, isActive }: SlideProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ${
        isActive ? "opacity-100" : "opacity-0"
      } ${mounted ? "slide-enter" : ""}`}
      style={{
        backgroundImage: `url(https://picsum.photos/seed/${imageIndex}/1920/1080)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="slide-overlay absolute inset-0 flex items-center justify-center p-8 bg-black/40">
        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-light text-center max-w-4xl leading-tight">
          {text}
        </h2>
      </div>
    </div>
  );
};