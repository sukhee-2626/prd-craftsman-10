
-- Timestamp helper (idempotent)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- PRDs table
CREATE TABLE public.prds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  idea TEXT NOT NULL,
  sections JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_prds_user_id_created_at ON public.prds(user_id, created_at DESC);

ALTER TABLE public.prds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own PRDs"
  ON public.prds FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own PRDs"
  ON public.prds FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own PRDs"
  ON public.prds FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own PRDs"
  ON public.prds FOR DELETE
  USING (auth.uid() = user_id);

CREATE TRIGGER update_prds_updated_at
  BEFORE UPDATE ON public.prds
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
