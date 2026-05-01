import { ItemsProvider } from "@/context/ItemsContext";
import ItemsToolbar from "@/components/items/ItemsToolbar";
import ItemsTable from "@/components/items/ItemsTable";
import ItemFormModal from "@/components/items/ItemFormModal";
import ItemDeleteDialog from "@/components/items/ItemDeleteDialog";
import type { Item } from "@/types/item";
import { items } from "@/lib/mock-items";

async function getItems(): Promise<Item[]> {
  return items;
}

export default async function ItemsPage() {
  const items = await getItems();

  return (
    <ItemsProvider initialItems={items}>
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/70">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            إدارة العناصر
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            صفحة CRUD تجريبية لإضافة العناصر وتعديلها وحذفها مع دعم كامل للوضعين النهاري والليلي.
          </p>
        </div>

        <ItemsToolbar />
        <ItemsTable />
        <ItemFormModal />
        <ItemDeleteDialog />
      </div>
    </ItemsProvider>
  );
}
