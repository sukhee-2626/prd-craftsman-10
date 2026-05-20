import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, FileText, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PRDRow {
  id: string;
  product_name: string;
  idea: string;
  created_at: string;
}

const History = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [prds, setPrds] = useState<PRDRow[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data, error } = await supabase
        .from("prds")
        .select("id, product_name, idea, created_at")
        .order("created_at", { ascending: false });
      if (error) {
        toast({ title: "Failed to load history", description: error.message, variant: "destructive" });
      } else {
        setPrds(data ?? []);
      }
      setFetching(false);
    })();
  }, [user, toast]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("prds").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      setPrds((prev) => prev.filter((p) => p.id !== id));
      toast({ title: "Deleted", description: "PRD removed from history." });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Badge variant="secondary" className="mb-2">History</Badge>
            <h1 className="font-serif text-3xl font-bold md:text-4xl">Your PRDs</h1>
          </div>
          <Button asChild>
            <Link to="/"><Plus className="mr-2 h-4 w-4" /> New PRD</Link>
          </Button>
        </div>

        {fetching ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : prds.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
              <FileText className="h-12 w-12 text-muted-foreground" />
              <div>
                <p className="font-medium">No PRDs yet</p>
                <p className="text-sm text-muted-foreground">Generate your first PRD to see it here.</p>
              </div>
              <Button asChild><Link to="/">Create a PRD</Link></Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {prds.map((prd) => (
              <Card key={prd.id} className="transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="font-serif text-xl">
                      <Link to={`/prd/${prd.id}`} className="hover:underline">{prd.product_name}</Link>
                    </CardTitle>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{prd.idea}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {new Date(prd.created_at).toLocaleString()}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(prd.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default History;