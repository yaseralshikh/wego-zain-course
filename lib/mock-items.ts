import type { Item } from "@/types/item";

export const items: Item[] = [
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
  },
];
