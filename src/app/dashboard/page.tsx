import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Moneyzya - Dashboard",
    description: "Your Personal Dashboard with AI :)",
}
export default function DashboardPage() {
    return (
        <div className="p-2 space-y-4">
            <section id="header">
                <h1 className="text-4xl font-bold text-main">Dashboard</h1>
                <p>Get insight into your spending, track your expenses, and manage your finances.</p>
            </section>
            <section id="content"></section> 
        </div>
    );
}