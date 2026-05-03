"use client";

import { useCustomers } from "@/context/CustomersContext";

export default function CustomersTable() {
  const {
    customers,
    search,
    openEditModal,
    openDeleteDialog,
  } = useCustomers();

  const filteredCustomers = customers.filter((customer) => {
    const normalizedSearch = search.toLowerCase();
    const customerName = customer.name?.toLowerCase() ?? "";
    const customerEmail = customer.email?.toLowerCase() ?? "";

    return (
      customerName.includes(normalizedSearch) ||
      customerEmail.includes(normalizedSearch)
    );
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/90 shadow-sm dark:border-gray-800 dark:bg-gray-950/70">
      <table className="min-w-full text-sm text-gray-700 dark:text-gray-200">
        <thead className="bg-gray-50 text-center text-gray-600 dark:bg-gray-900/80 dark:text-gray-300">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Image URL</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                لا توجد نتائج مطابقة
              </td>
            </tr>
          ) : (
            filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t border-gray-200 text-center transition hover:bg-gray-50/80 dark:border-gray-800 dark:hover:bg-gray-900/60"
              >
                <td className="px-4 py-3">{customer.name ?? "-"}</td>
                <td className="px-4 py-3">{customer.email ?? "-"}</td>
                <td dir="ltr" className="px-4 py-3 text-left">
                  {customer.image_url ?? "-"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(customer)}
                      className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                      تعديل
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteDialog(customer)}
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
