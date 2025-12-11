import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `Act as a world-class Product Manager, Prompt Engineer and Technical Architect with 10+ years experience creating PRDs, startup ideas, feature documents, and AI product definitions.

Your task is to generate a complete, detailed, professional PRD (Product Requirement Document) for the product idea provided.

Context:
- The product is being built by a small but highly talented startup team
- The PRD must be clean, clear, easy to understand, practical and implementable
- Use industry standard PM language
- Avoid unnecessary jargon, write only what adds value

You MUST respond with valid JSON in this exact format:
{
  "productName": "The product name",
  "sections": [
    {"emoji": "🟥", "title": "Problem Statement", "content": "...", "color": "red"},
    {"emoji": "🟩", "title": "Solution Summary", "content": "...", "color": "green"},
    {"emoji": "🟨", "title": "User Personas", "content": "...", "color": "yellow"},
    {"emoji": "🟪", "title": "Core Features", "content": "...", "color": "purple"},
    {"emoji": "🟧", "title": "User Journey / Flow", "content": "...", "color": "orange"},
    {"emoji": "🔷", "title": "System Architecture", "content": "...", "color": "blue"},
    {"emoji": "🟫", "title": "Tech Stack", "content": "...", "color": "brown"},
    {"emoji": "🟩", "title": "Future Enhancements", "content": "...", "color": "green"},
    {"emoji": "🟥", "title": "Risks & Mitigation", "content": "...", "color": "red"},
    {"emoji": "📊", "title": "Success Metrics", "content": "...", "color": "blue"},
    {"emoji": "🟦", "title": "Final Summary", "content": "...", "color": "blue"}
  ]
}

Each section content should be detailed with bullet points, numbered lists, and clear structure. Use \\n for line breaks within content.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { idea } = await req.json();
    
    if (!idea || typeof idea !== 'string') {
      return new Response(
        JSON.stringify({ error: "Please provide a product idea" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating PRD for idea:", idea.substring(0, 100));

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate a comprehensive PRD for this product idea:\n\n${idea}` }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content returned from AI");
    }

    console.log("AI response received, parsing JSON...");

    // Extract JSON from the response (handle markdown code blocks)
    let jsonContent = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonContent = jsonMatch[1].trim();
    }

    const prd = JSON.parse(jsonContent);

    return new Response(JSON.stringify(prd), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating PRD:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate PRD" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
