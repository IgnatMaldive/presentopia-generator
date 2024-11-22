import { useEffect, useState } from "react";

interface SlideProps {
  text: string;
  imageIndex: number;
  isActive: boolean;
}

const UNSPLASH_IMAGES = [
  "photo-1498050108023-c5249f4df085",
  "photo-1488590528505-98d2b5aba04b",
  "photo-1518770660439-4636190af475",
  "photo-1461749280684-dccba630e2f6",
  "photo-1486312338219-ce68d2c6f44d",
  "photo-1581091226825-a6a2a5aee158",
  "photo-1485827404703-89b55fcc595e",
  "photo-1460925895917-afdab827c52f",
  "photo-1500375592092-40eb2168fd21",
  "photo-1649972904349-6e44c42644a7",
];

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
        backgroundImage: `url(https://images.unsplash.com/${
          UNSPLASH_IMAGES[imageIndex % UNSPLASH_IMAGES.length]
        }?auto=format&fit=crop&w=1920&q=80)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="slide-overlay absolute inset-0 flex items-center justify-center p-8">
        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-light text-center max-w-4xl leading-tight">
          {text}
        </h2>
      </div>
    </div>
  );
};