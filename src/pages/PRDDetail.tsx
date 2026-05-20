import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import PRDOutput from "@/components/PRDOutput";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PRDDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState<{ product_name: string; sections: any[] } | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user || !id) return;
    (async () => {
      const { data: row, error } = await supabase
        .from("prds")
        .select("product_name, sections")
        .eq("id", id)
        .maybeSingle();
      if (error) {
        toast({ title: "Failed to load PRD", description: error.message, variant: "destructive" });
      } else if (row) {
        setData({ product_name: row.product_name, sections: row.sections as any[] });
      }
      setFetching(false);
    })();
  }, [user, id, toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        <div className="container mx-auto max-w-4xl px-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/history"><ArrowLeft className="mr-2 h-4 w-4" /> Back to history</Link>
          </Button>
        </div>
        {fetching ? (
          <p className="container mx-auto px-4 text-muted-foreground">Loading...</p>
        ) : data ? (
          <PRDOutput productName={data.product_name} sections={data.sections} />
        ) : (
          <p className="container mx-auto px-4 text-muted-foreground">PRD not found.</p>
        )}
      </main>
    </div>
  );
};

export default PRDDetail;