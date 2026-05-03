"use client";

import { useCustomers } from "@/context/CustomersContext";

export default function CustomersToolbar() {
  const { search, setSearch, openCreateModal } = useCustomers();

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white/85 p-4 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/70 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="ابحث بالاسم أو البريد..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-500"
        />
      </div>

      <button
        type="button"
        onClick={openCreateModal}
        className="rounded-xl bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
      >
        إضافة عميل
      </button>
    </div>
  );
}
