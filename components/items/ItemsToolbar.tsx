"use client";

import type { ItemStatusFilter } from "@/types/item";
import { useItems } from "@/context/ItemsContext";

const STATUS_FILTER_OPTIONS: ItemStatusFilter[] = ["all", "active", "inactive"];

function isStatusFilter(value: string): value is ItemStatusFilter {
  return STATUS_FILTER_OPTIONS.some((option) => option === value);
}

export default function ItemsToolbar() {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    openCreateModal,
  } = useItems();

  function handleStatusChange(value: string) {
    if (isStatusFilter(value)) {
      setStatusFilter(value);
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white/85 p-4 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/70 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="ابحث بالاسم..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-500"
        >
          <option value="all">كل الحالات</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
        </select>
      </div>

      <button
        type="button"
        onClick={openCreateModal}
        className="rounded-xl bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
      >
        إضافة عنصر
      </button>
    </div>
  );
}
