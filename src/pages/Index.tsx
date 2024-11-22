import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Presentation } from "@/components/Presentation";
import { fetchWikipediaContent } from "@/services/wikipediaService";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [subject, setSubject] = useState("");
  const [slides, setSlides] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!subject.trim()) {
      toast({
        title: "Please enter a subject",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const sentences = await fetchWikipediaContent(subject);
      if (sentences.length < 3) {
        toast({
          title: "Not enough content found",
          description: "Please try a different subject",
          variant: "destructive",
        });
        return;
      }
      setSlides(sentences);
    } catch (error) {
      toast({
        title: "Error generating presentation",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      {slides.length === 0 ? (
        <div className="max-w-md w-full space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Presentation Generator</h1>
            <p className="text-gray-400">
              Enter a subject to generate a beautiful presentation
            </p>
          </div>
          
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter subject (e.g., 'Artificial Intelligence')"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-white/10 text-white placeholder:text-gray-400 border-white/20"
            />
            
            <Button
              onClick={handleGenerate}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Presentation"}
            </Button>
          </div>
        </div>
      ) : (
        <Presentation slides={slides} onClose={() => setSlides([])} />
      )}
    </div>
  );
};

export default Index;