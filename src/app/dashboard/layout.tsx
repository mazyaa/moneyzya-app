import AppSidebar from "@/components/layouts/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function SidebarLayout({ children } : { children: React.ReactNode }) { 
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 p-4">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}