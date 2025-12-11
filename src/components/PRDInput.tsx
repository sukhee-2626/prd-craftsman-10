import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2 } from "lucide-react";

interface PRDInputProps {
  onGenerate: (idea: string) => void;
  isLoading: boolean;
}

const PRDInput = ({ onGenerate, isLoading }: PRDInputProps) => {
  const [idea, setIdea] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onGenerate(idea);
    }
  };

  const exampleIdeas = [
    "A mobile app that helps people find dog-friendly restaurants",
    "An AI-powered tool that converts voice memos to organized notes",
    "A marketplace connecting freelance chefs with home cooks",
  ];

  return (
    <section className="container mx-auto px-4 pb-16">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8">
          <label htmlFor="product-idea" className="mb-3 block text-sm font-semibold text-foreground">
            Describe Your Product Idea
          </label>
          <Textarea
            id="product-idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="E.g., A mobile app that helps remote teams track their daily standups and automatically generates meeting summaries using AI..."
            className="mb-4 min-h-[140px] resize-none border-border bg-background text-base placeholder:text-muted-foreground/60 focus-visible:ring-primary"
          />
          
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground">Try:</span>
            {exampleIdeas.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setIdea(example)}
                className="rounded-full border border-border bg-accent/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:bg-accent hover:text-foreground"
              >
                {example.slice(0, 40)}...
              </button>
            ))}
          </div>
          
          <Button 
            type="submit" 
            size="lg" 
            disabled={!idea.trim() || isLoading}
            className="w-full gap-2 text-base font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating PRD...
              </>
            ) : (
              <>
                <Wand2 className="h-5 w-5" />
                Generate PRD
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default PRDInput;
