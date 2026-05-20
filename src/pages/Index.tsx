import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PRDInput from "@/components/PRDInput";
import PRDOutput from "@/components/PRDOutput";
import { generatePRD, GeneratedPRD } from "@/lib/generatePRD";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPRD, setGeneratedPRD] = useState<GeneratedPRD | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGenerate = async (idea: string) => {
    if (!user) {
      toast({ title: "Sign in required", description: "Create an account to generate and save PRDs." });
      navigate("/auth");
      return;
    }
    setIsLoading(true);
    try {
      const prd = await generatePRD(idea);
      setGeneratedPRD(prd);
      const { error: saveError } = await supabase.from("prds").insert({
        user_id: user.id,
        product_name: prd.productName,
        idea,
        sections: prd.sections as any,
      });
      if (saveError) {
        toast({
          title: "Saved locally only",
          description: "Could not save PRD to your history: " + saveError.message,
          variant: "destructive",
        });
      }
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
