import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PRDInput from "@/components/PRDInput";
import PRDOutput from "@/components/PRDOutput";
import { generatePRD, GeneratedPRD } from "@/lib/generatePRD";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPRD, setGeneratedPRD] = useState<GeneratedPRD | null>(null);
  const { toast } = useToast();

  const handleGenerate = async (idea: string) => {
    setIsLoading(true);
    try {
      const prd = await generatePRD(idea);
      setGeneratedPRD(prd);
      toast({
        title: "PRD Generated!",
        description: `Successfully created PRD for "${prd.productName}"`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate PRD",
        variant: "destructive",
      });
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
