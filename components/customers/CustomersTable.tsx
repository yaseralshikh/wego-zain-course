import type { Customer } from "@/types/customer";

type CustomersTableProps = {
  customers: Customer[];
};

export default function CustomersTable({
  customers,
}: CustomersTableProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/90 shadow-sm dark:border-gray-800 dark:bg-gray-950/70">
      <table className="min-w-full text-sm text-gray-700 dark:text-gray-200">
        <thead className="bg-gray-50 text-center text-gray-600 dark:bg-gray-900/80 dark:text-gray-300">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Image URL</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                لا توجد بيانات
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t border-gray-200 text-center dark:border-gray-800"
              >
                <td className="px-4 py-3">{customer.name ?? "-"}</td>
                <td className="px-4 py-3">{customer.email ?? "-"}</td>
                <td className="px-4 py-3">{customer.image_url ?? "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
