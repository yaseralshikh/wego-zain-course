import { supabase } from "@/lib/supabase/client";
import { CustomersProvider } from "@/context/CustomersContext";
import type { Customer } from "@/types/customer";
import CustomersDeleteDialog from "@/components/customers/CustomersDeleteDialog";
import CustomersFormModal from "@/components/customers/CustomersFormModal";
import CustomersTable from "@/components/customers/CustomersTable";
import CustomersToolbar from "@/components/customers/CustomersToolbar";

async function getCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase.from("customers").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <CustomersProvider initialCustomers={customers}>
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/70">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                العملاء
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                بيانات العملاء القادمة من Supabase
            </p>
        </div>

        <CustomersToolbar />
        <CustomersTable />
        <CustomersFormModal />
        <CustomersDeleteDialog />
      </div>
    </CustomersProvider>
  );
}
