export type ItemStatus = "active" | "inactive";
export type ItemStatusFilter = "all" | ItemStatus;

export interface Item {
  id: string;
  name: string;
  status: ItemStatus;
  category: string;
  createdAt: string;
}

export type CreateItemInput = Omit<Item, "id" | "createdAt">;

export type UpdateItemInput = Partial<CreateItemInput>;
