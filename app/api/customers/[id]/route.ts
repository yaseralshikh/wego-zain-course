import { supabase } from "@/lib/supabase/client";
import type { UpdateCustomerInput } from "@/types/customer";

type CustomerRouteContext = RouteContext<"/api/customers/[id]">;

const updatableFields = ["name", "email", "image_url"] as const;

async function getCustomerId(context: CustomerRouteContext) {
  const { id } = await context.params;

  if (!id || !id.trim()) {
    throw new Error("Customer id is required.");
  }

  return id;
}

async function parseUpdatePayload(request: Request): Promise<UpdateCustomerInput> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    throw new Error("Request body must be valid JSON.");
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new Error("Request body must be an object.");
  }

  const payload: UpdateCustomerInput = {};
  let hasAtLeastOneField = false;

  for (const field of updatableFields) {
    if (!(field in body)) {
      continue;
    }

    const value = (body as Record<string, unknown>)[field];

    if (value !== null && typeof value !== "string") {
      throw new Error(`Field "${field}" must be a string or null.`);
    }

    payload[field] = value;
    hasAtLeastOneField = true;
  }

  if (!hasAtLeastOneField) {
    throw new Error("At least one updatable field is required.");
  }

  return payload;
}

export async function GET(_request: Request, context: CustomerRouteContext) {
  let id: string;

  try {
    id = await getCustomerId(context);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Invalid customer id." },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return Response.json({ error: "Customer not found." }, { status: 404 });
  }

  return Response.json(data);
}

export async function PUT(request: Request, context: CustomerRouteContext) {
  let id: string;
  let payload: UpdateCustomerInput;

  try {
    id = await getCustomerId(context);
    payload = await parseUpdatePayload(request);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Invalid request." },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("customers")
    .update(payload)
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return Response.json({ error: "Customer not found." }, { status: 404 });
  }

  return Response.json(data);
}

export async function DELETE(_request: Request, context: CustomerRouteContext) {
  let id: string;

  try {
    id = await getCustomerId(context);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Invalid customer id." },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return Response.json({ error: "Customer not found." }, { status: 404 });
  }

  return Response.json(data);
}
