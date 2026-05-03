"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Customer } from "@/types/customer";

type CustomersContextValue = {
  customers: Customer[];
  search: string;
  selectedCustomer: Customer | null;
  isFormOpen: boolean;
  isDeleteOpen: boolean;
  setSearch: (value: string) => void;
  setCustomers: (customers: Customer[]) => void;
  openCreateModal: () => void;
  openEditModal: (customer: Customer) => void;
  closeFormModal: () => void;
  openDeleteDialog: (customer: Customer) => void;
  closeDeleteDialog: () => void;
};

type CustomersProviderProps = {
  initialCustomers: Customer[];
  children: ReactNode;
};

const CustomersContext = createContext<CustomersContextValue | null>(null);

export function CustomersProvider({
  initialCustomers,
  children,
}: CustomersProviderProps) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function openCreateModal() {
    setSelectedCustomer(null);
    setIsFormOpen(true);
  }

  function openEditModal(customer: Customer) {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  }

  function closeFormModal() {
    setIsFormOpen(false);
    setSelectedCustomer(null);
  }

  function openDeleteDialog(customer: Customer) {
    setSelectedCustomer(customer);
    setIsDeleteOpen(true);
  }

  function closeDeleteDialog() {
    setIsDeleteOpen(false);
    setSelectedCustomer(null);
  }

  return (
    <CustomersContext.Provider
      value={{
        customers,
        search,
        selectedCustomer,
        isFormOpen,
        isDeleteOpen,
        setSearch,
        setCustomers,
        openCreateModal,
        openEditModal,
        closeFormModal,
        openDeleteDialog,
        closeDeleteDialog,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
}

export function useCustomers() {
  const context = useContext(CustomersContext);

  if (!context) {
    throw new Error("useCustomers must be used inside CustomersProvider");
  }

  return context;
}
