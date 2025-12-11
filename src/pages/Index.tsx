import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PRDInput from "@/components/PRDInput";
import PRDOutput from "@/components/PRDOutput";
import { generatePRD } from "@/lib/generatePRD";

interface PRDSection {
  emoji: string;
  title: string;
  content: string;
  color: string;
}

interface GeneratedPRD {
  productName: string;
  sections: PRDSection[];
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPRD, setGeneratedPRD] = useState<GeneratedPRD | null>(null);

  const handleGenerate = async (idea: string) => {
    setIsLoading(true);
    try {
      const prd = await generatePRD(idea);
      setGeneratedPRD(prd);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <PRDInput onGenerate={handleGenerate} isLoading={isLoading} />
        {generatedPRD && (
          <PRDOutput 
            productName={generatedPRD.productName} 
            sections={generatedPRD.sections} 
          />
        )}
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>PRD Generator — Transform your ideas into professional documents</p>
      </footer>
    </div>
  );
};

export default Index;
