import { supabase } from "@/integrations/supabase/client";

interface PRDSection {
  emoji: string;
  title: string;
  content: string;
  color: string;
}

export interface GeneratedPRD {
  productName: string;
  sections: PRDSection[];
}

export const generatePRD = async (idea: string): Promise<GeneratedPRD> => {
  const { data, error } = await supabase.functions.invoke('generate-prd', {
    body: { idea }
  });

  if (error) {
    console.error('Error generating PRD:', error);
    throw new Error(error.message || 'Failed to generate PRD');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data as GeneratedPRD;
};
