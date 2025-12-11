import { FileText } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl font-bold">PRD Generator</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          <span className="text-sm text-muted-foreground">Transform ideas into professional documents</span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
