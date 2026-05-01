import { CreateItemInput, Item } from "@/types/item";

const items: Item[] = [
  {
    id: "1",
    name: "Item One",
    status: "active",
    category: "Category A",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Item Two",
    status: "inactive",
    category: "Category B",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Item Three",
    status: "active",
    category: "Category A",
    createdAt: new Date().toISOString(),
  }
];

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
  } catch (error) {
    return Response.json({ error: "Failed to create item" }, { status: 500 });
  }
}
