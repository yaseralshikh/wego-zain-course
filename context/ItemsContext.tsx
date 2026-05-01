"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Item } from "@/types/item";

type ItemsContextValue = {
  items: Item[];
  search: string;
  statusFilter: "all" | "active" | "inactive";
  selectedItem: Item | null;
  isFormOpen: boolean;
  isDeleteOpen: boolean;
  setSearch: (value: string) => void;
  setStatusFilter: (value: "all" | "active" | "inactive") => void;
  setItems: (items: Item[]) => void;
  openCreateModal: () => void;
  openEditModal: (item: Item) => void;
  closeFormModal: () => void;
  openDeleteDialog: (item: Item) => void;
  closeDeleteDialog: () => void;
};

type ItemsProviderProps = {
  initialItems: Item[];
  children: ReactNode;
};

const ItemsContext = createContext<ItemsContextValue | null>(null);

export function ItemsProvider({
  initialItems,
  children,
}: ItemsProviderProps) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function openCreateModal() {
    setSelectedItem(null);
    setIsFormOpen(true);
  }

  function openEditModal(item: Item) {
    setSelectedItem(item);
    setIsFormOpen(true);
  }

  function closeFormModal() {
    setIsFormOpen(false);
    setSelectedItem(null);
  }

  function openDeleteDialog(item: Item) {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  }

  function closeDeleteDialog() {
    setIsDeleteOpen(false);
    setSelectedItem(null);
  }

  return (
    <ItemsContext.Provider
      value={{
        items,
        search,
        statusFilter,
        selectedItem,
        isFormOpen,
        isDeleteOpen,
        setSearch,
        setStatusFilter,
        setItems,
        openCreateModal,
        openEditModal,
        closeFormModal,
        openDeleteDialog,
        closeDeleteDialog,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemsContext);

  if (!context) {
    throw new Error("useItems must be used inside ItemsProvider");
  }

  return context;
}
