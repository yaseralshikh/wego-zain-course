"use client";

import { useState } from "react";

import { useCustomers } from "@/context/CustomersContext";

export default function CustomersDeleteDialog() {
  const {
    isDeleteOpen,
    selectedCustomer,
    closeDeleteDialog,
    customers,
    setCustomers,
  } = useCustomers();
  const [errorMessage, setErrorMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isDeleteOpen || !selectedCustomer) {
    return null;
  }

  async function handleDelete() {
    const customerToDelete = selectedCustomer;

    if (!customerToDelete) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/customers/${customerToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(errorData?.error || "فشل في حذف العميل");
      }

      setCustomers(
        customers.filter((customer) => customer.id !== customerToDelete.id),
      );
      closeDeleteDialog();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "حدث خطأ غير متوقع",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-950">
        <h2 className="text-lg font-semibold text-red-600">تأكيد الحذف</h2>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          هل أنت متأكد من حذف العميل:
          {" "}
          <span className="font-medium">
            {selectedCustomer.name ?? selectedCustomer.email ?? "بدون اسم"}
          </span>
          ؟
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
