"use client";

import { useState, type ComponentProps } from "react";

import { useCustomers } from "@/context/CustomersContext";
import type {
  CreateCustomerInput,
  Customer,
  UpdateCustomerInput,
} from "@/types/customer";

export default function CustomersFormModal() {
  const {
    isFormOpen,
    selectedCustomer,
    closeFormModal,
    customers,
    setCustomers,
  } = useCustomers();

  if (!isFormOpen) {
    return null;
  }

  return (
    <CustomersFormContent
      key={selectedCustomer?.id ?? "new-customer"}
      selectedCustomer={selectedCustomer}
      customers={customers}
      setCustomers={setCustomers}
      closeFormModal={closeFormModal}
    />
  );
}

type CustomersFormContentProps = {
  selectedCustomer: Customer | null;
  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
  closeFormModal: () => void;
};

function CustomersFormContent({
  selectedCustomer,
  customers,
  setCustomers,
  closeFormModal,
}: CustomersFormContentProps) {
  const [name, setName] = useState(selectedCustomer?.name ?? "");
  const [email, setEmail] = useState(selectedCustomer?.email ?? "");
  const [imageUrl, setImageUrl] = useState(selectedCustomer?.image_url ?? "");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    void submitForm();
  };

  async function submitForm() {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedImageUrl = imageUrl.trim();

    if (!trimmedName && !trimmedEmail && !trimmedImageUrl) {
      setErrorMessage("أدخل قيمة واحدة على الأقل");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (selectedCustomer) {
        const payload: UpdateCustomerInput = {
          name: trimmedName || null,
          email: trimmedEmail || null,
          image_url: trimmedImageUrl || null,
        };

        const response = await fetch(`/api/customers/${selectedCustomer.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = (await response.json().catch(() => null)) as
            | { error?: string }
            | null;
          throw new Error(errorData?.error || "فشل في تعديل العميل");
        }

        const updatedCustomer = (await response.json()) as Customer;

        setCustomers(
          customers.map((customer) =>
            customer.id === updatedCustomer.id ? updatedCustomer : customer,
          ),
        );
      } else {
        const payload: CreateCustomerInput = {
          name: trimmedName || null,
          email: trimmedEmail || null,
          image_url: trimmedImageUrl || null,
        };

        const response = await fetch("/api/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = (await response.json().catch(() => null)) as
            | { error?: string }
            | null;
          throw new Error(errorData?.error || "فشل في إضافة العميل");
        }

        const createdCustomer = (await response.json()) as Customer;

        setCustomers([...customers, createdCustomer]);
      }

      closeFormModal();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "حدث خطأ غير متوقع",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-950">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {selectedCustomer ? "تعديل عميل" : "إضافة عميل"}
          </h2>

          <button
            type="button"
            onClick={closeFormModal}
            disabled={isSubmitting}
            className="rounded-lg px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-100 disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            إغلاق
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="اسم العميل"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-500"
          />

          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-500"
          />

          <input
            type="url"
            placeholder="رابط الصورة"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-500"
          />

          {errorMessage ? (
            <p className="text-sm text-red-600">{errorMessage}</p>
          ) : null}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeFormModal}
              disabled={isSubmitting}
              className="rounded-xl border border-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-800 disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              {isSubmitting
                ? "جاري الحفظ..."
                : selectedCustomer
                  ? "حفظ التعديلات"
                  : "إضافة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
