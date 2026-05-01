"use client";

import { useItems } from "@/context/ItemsContext";

export default function ItemsTable() {
  const {
    items,
    search,
    statusFilter,
    openEditModal,
    openDeleteDialog,
  } = useItems();

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function getStatusClasses(status: "active" | "inactive") {
    return status === "active"
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
      : "bg-slate-200 text-slate-700 dark:bg-slate-700/40 dark:text-slate-300";
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/90 shadow-sm dark:border-gray-800 dark:bg-gray-950/70">
      <table className="min-w-full text-sm text-gray-700 dark:text-gray-200">
        <thead className="bg-gray-50 text-center text-gray-600 dark:bg-gray-900/80 dark:text-gray-300">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Created At</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
            {filteredItems.length === 0 ? (
                <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        لا توجد نتائج مطابقة
                    </td>
                </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} className="border-t text-center border-gray-200 transition hover:bg-gray-50/80 dark:border-gray-800 dark:hover:bg-gray-900/60">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{item.category}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{item.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-center">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteDialog(item)}
                        className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}         
        </tbody>
      </table>
    </div>
  );
}
