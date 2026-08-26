"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineChartBarSquare,
  HiOutlineClipboardDocumentList,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import SrdNavIcon from "./SrdNavIcon";

const navItems = [
  { href: "/provider", label: "Dashboard", icon: HiOutlineChartBarSquare },
  { href: "/provider/requests", label: "All Requests", icon: HiOutlineClipboardDocumentList },

];

export default function ProviderShell({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0   hidden w-55 flex-col bg-primary text-white lg:flex">
        <div className="flex h-16 items-center border-b border-white/10 px-5">
          <SrdNavIcon></SrdNavIcon>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              (pathname === item.href ||
                (item.href !== "/provider" && pathname.startsWith(item.href)));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition ${
                  active
                    ? "bg-white/40 text-white shadow-sm"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {item.label === "Reports" && (
                  <HiOutlineChevronRight className="ml-auto" size={14} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4 text-xs   leading-4 text-slate-500">
          Internal support workspace
        </div>
      </aside>
      
      <main className="min-h-screen lg:pl-55">{children}</main>
    </div>
  );
}