import { FileText, History as HistoryIcon, LogOut, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user, signOut } = useAuth();
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl font-bold">PRD Generator</span>
        </Link>
        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/history"><HistoryIcon className="mr-2 h-4 w-4" /> History</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" /> Sign out
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/auth"><LogIn className="mr-2 h-4 w-4" /> Sign in</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
