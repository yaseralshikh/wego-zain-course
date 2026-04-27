"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

const navItems = [{ label: "الرئيسية", href: "/" }];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();

  return (
    <>
      {/* Overlay للموبايل */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 right-0 z-30
          w-64 h-full bg-gray-900 dark:bg-gray-950 text-white
          flex flex-col p-4 shrink-0 border-r border-gray-800
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0 lg:hidden"}
        `}
      >
        <div className="text-xl font-bold mb-8 px-2">⚡ Starter</div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg transition-colors ${
                pathname === item.href ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
