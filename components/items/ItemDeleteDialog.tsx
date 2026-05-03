"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useItems } from "@/context/ItemsContext";

export default function ItemDeleteDialog() {
  const { isDeleteOpen, selectedItem, closeDeleteDialog, items, setItems } = useItems();
  const [errorMessage, setErrorMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isDeleteOpen || !selectedItem) {
    return null;
  }

  async function handleDelete() {
    const itemToDelete = selectedItem;

    if (!itemToDelete) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/items/${itemToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("فشل في حذف العنصر");
      }

      setItems(items.filter((item) => item.id !== itemToDelete.id));
      toast.success("تم حذف العنصر بنجاح");
      closeDeleteDialog();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-950">
        <h2 className="text-lg font-semibold text-red-600">تأكيد الحذف</h2>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          هل أنت متأكد من حذف العنصر: <span className="font-medium">{selectedItem.name}</span>؟
        </p>

        {errorMessage ? (
          <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
        ) : null}

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={closeDeleteDialog}
            disabled={isDeleting}
            className="rounded-xl border border-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:opacity-50 dark:bg-red-500 dark:hover:bg-red-400"
          >
            {isDeleting ? "جاري الحذف..." : "تأكيد الحذف"}
          </button>
        </div>
      </div>
    </div>
  );
}
