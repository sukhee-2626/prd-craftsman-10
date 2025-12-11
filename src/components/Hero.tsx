import { FileText, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent-foreground/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered PRD Generator</span>
          </div>
          
          <h1 className="mb-6 max-w-4xl font-serif text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Transform Ideas into
            <span className="relative mx-2 text-primary">
              Professional PRDs
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M2 6C50 2 150 2 198 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/40"/>
              </svg>
            </span>
          </h1>
          
          <p className="mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Enter your product idea and get a comprehensive, well-structured Product Requirement Document 
            with all essential sections in seconds.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span>11 Comprehensive Sections</span>
            </div>
            <div className="hidden h-4 w-px bg-border md:block" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Industry-Standard Format</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
