import { Item, UpdateItemInput } from "@/types/item";

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
];

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;

  const item = items.find((entry) => entry.id === id);

  if (!item) {
    return Response.json({ message: "Item not found" }, { status: 404 });
  }

  return Response.json(item);
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = (await request.json()) as UpdateItemInput;

  const itemIndex = items.findIndex((entry) => entry.id === id);

  if (itemIndex === -1) {
    return Response.json({ message: "Item not found" }, { status: 404 });
  }

  const currentItem = items[itemIndex];

  const updatedItem: Item = {
    ...currentItem,
    ...body,
  };

  items[itemIndex] = updatedItem;

  return Response.json(updatedItem);
}

export async function DELETE(_: Request, context: RouteContext) {
  const { id } = await context.params;

  const itemIndex = items.findIndex((entry) => entry.id === id);

  if (itemIndex === -1) {
    return Response.json({ message: "Item not found" }, { status: 404 });
  }

  const deletedItem = items[itemIndex];

  items.splice(itemIndex, 1);

  return Response.json(deletedItem);
}
