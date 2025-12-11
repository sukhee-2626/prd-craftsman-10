import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Download, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface PRDSection {
  emoji: string;
  title: string;
  content: string;
  color: string;
}

interface PRDOutputProps {
  productName: string;
  sections: PRDSection[];
}

const PRDOutput = ({ productName, sections }: PRDOutputProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = sections.map(s => `${s.emoji} ${s.title}\n${s.content}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Your PRD has been copied successfully.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="container mx-auto px-4 pb-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge variant="secondary" className="mb-2">Generated PRD</Badge>
            <h2 className="font-serif text-2xl font-bold md:text-3xl">{productName}</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card 
              key={index} 
              className="overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-md"
            >
              <CardHeader className="border-b border-border/50 bg-accent/30 pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <span className="text-2xl">{section.emoji}</span>
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  {section.content.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('•') || line.startsWith('-') ? 'ml-4' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PRDOutput;
