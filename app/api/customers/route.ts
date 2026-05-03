import { supabase } from "@/lib/supabase/client";
import type { CreateCustomerInput } from "@/types/customer";

export async function GET() {
  const { data, error } = await supabase.from("customers").select("*");

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateCustomerInput;

    const payload: CreateCustomerInput = {
      name: body.name?.trim() || null,
      email: body.email?.trim() || null,
      image_url: body.image_url?.trim() || null,
    };

    const hasAtLeastOneField = Object.values(payload).some(
      (value) => value !== null && value.length > 0,
    );

    if (!hasAtLeastOneField) {
      return Response.json(
        { error: "At least one customer field is required." },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("customers")
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to create customer." }, { status: 500 });
  }
}
