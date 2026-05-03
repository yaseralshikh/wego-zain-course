import { CreateItemInput, Item } from "@/types/item";
import { items } from "@/lib/mock-items";

export async function GET() {
  return Response.json(items);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateItemInput;

    const newItem: Item = {
      id: crypto.randomUUID(),
      name: body.name,
      status: body.status,
      category: body.category,
      createdAt: new Date().toISOString(),
    };

    items.push(newItem);    
    return Response.json(newItem, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to create item" }, { status: 500 });
  }
}
