import { supabase } from "@/lib/supabase/client";

export async function GET() {
  const { data, error } = await supabase.from("customers").select("*");

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}
