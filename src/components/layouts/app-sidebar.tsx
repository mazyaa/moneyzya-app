"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { BanknoteIcon, CoinsIcon, LayoutDashboardIcon } from "lucide-react";
import { cn } from "cn";

const SidebarItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboardIcon />,
    href: "/dashboard",
  },
  {
    label: "Transaction",
    icon: <BanknoteIcon />,
    href: "/dashboard/transaction",
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="flex flex-row gap-2 items-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <CoinsIcon className="text-main size-5!" />
                <h1 className="text-2xl font-bold text-main">Moneyzya App</h1>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="px-2">
          {SidebarItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                tooltip={item.label}
                className={cn(
                  "mt-2 py-6 px-5 text-md",
                  pathname === item.href
                    ? "bg-main text-white font-semibold hover:bg-main hover:text-white"
                    : "hover:bg-main hover:text-white",
                )}
              >
                <Link href={item.href}>
                  {item.icon} <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
