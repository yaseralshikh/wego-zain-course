"use client";

import { useState, type ComponentProps } from "react";
import toast from "react-hot-toast";
import { useItems } from "@/context/ItemsContext";
import type {
  CreateItemInput,
  Item,
  ItemStatus,
  UpdateItemInput,
} from "@/types/item";

const ITEM_STATUS_OPTIONS: ItemStatus[] = ["active", "inactive"];

function isItemStatus(value: string): value is ItemStatus {
  return ITEM_STATUS_OPTIONS.some((option) => option === value);
}

export default function ItemFormModal() {
  const { isFormOpen, selectedItem, closeFormModal, items, setItems } = useItems();

  if (!isFormOpen) {
    return null;
  }

  return (
    <ItemFormContent
      key={selectedItem?.id ?? "new-item"}
      selectedItem={selectedItem}
      items={items}
      setItems={setItems}
      closeFormModal={closeFormModal}
    />
  );
}

type ItemFormContentProps = {
  selectedItem: Item | null;
  items: Item[];
  setItems: (items: Item[]) => void;
  closeFormModal: () => void;
};

function ItemFormContent({
  selectedItem,
  items,
  setItems,
  closeFormModal,
}: ItemFormContentProps) {
  const [name, setName] = useState(selectedItem?.name ?? "");
  const [category, setCategory] = useState(selectedItem?.category ?? "");
  const [status, setStatus] = useState<ItemStatus>(
    selectedItem?.status ?? "active",
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();
    void submitForm();
  };

  function handleStatusChange(value: string) {
    if (isItemStatus(value)) {
      setStatus(value);
    }
  }

  async function submitForm() {
    const trimmedName = name.trim();
    const trimmedCategory = category.trim();

    if (!trimmedName || !trimmedCategory) {
      setErrorMessage("الاسم والتصنيف مطلوبان");
      toast.error("الاسم والتصنيف مطلوبان");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (selectedItem) {
        const payload: UpdateItemInput = {
          name: trimmedName,
          category: trimmedCategory,
          status,
        };

        const response = await fetch(`/api/items/${selectedItem.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("فشل في تعديل العنصر");
        }

        const updatedItem = (await response.json()) as Item;

        setItems(
          items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
        );
        toast.success("تم تعديل العنصر بنجاح");
      } else {
        const payload: CreateItemInput = {
          name: trimmedName,
          category: trimmedCategory,
          status,
        };

        const response = await fetch("/api/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("فشل في إضافة العنصر");
        }

        const createdItem = (await response.json()) as Item;

        setItems([...items, createdItem]);
        toast.success("تمت إضافة العنصر بنجاح");
      }

      closeFormModal();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-950">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {selectedItem ? "تعديل عنصر" : "إضافة عنصر"}
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
            placeholder="اسم العنصر"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-500"
          />

          <input
            type="text"
            placeholder="التصنيف"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-500"
          />

          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-500"
          >
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select>

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
                : selectedItem
                  ? "حفظ التعديلات"
                  : "إضافة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
