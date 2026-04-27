"use client";

import ThemeToggle from "./ThemeToggle";
import { useSidebar } from "@/context/SidebarContext";

export default function Header() {
  const { toggle } = useSidebar();

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="تبديل القائمة"
        >
          <span className="block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 mb-1"></span>
          <span className="block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 mb-1"></span>
          <span className="block w-5 h-0.5 bg-gray-600 dark:bg-gray-300"></span>
        </button>
        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          لوحة التحكم
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold dark:text-white">
          م
        </div>
      </div>
    </header>
  );
}
