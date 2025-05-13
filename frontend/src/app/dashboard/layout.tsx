'use client'
import { useContext } from "react"
import { UserContext } from "../components/Auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { 
    LayoutDashboard, 
    BookOpen, 
    Calendar, 
    DollarSign, 
    Target,
    Menu,
    X,
    LogOut
} from "lucide-react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { signedIn, user, logout } = useContext(UserContext)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    if (!signedIn) redirect("/")
    if (!user.onboarded) redirect("/onboard")

    const menuItems = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/dashboard/journal", label: "Journal", icon: BookOpen },
        { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
        { href: "/dashboard/net-worth", label: "Net Worth", icon: DollarSign },
        { href: "/dashboard/goals", label: "Goals", icon: Target },
        { href: "/dashboard/books", label: "Books", icon: BookOpen },
    ]

    return (
        <div className="relative h-screen bg-[#0A0A0A]">
            {/* Mobile Sidebar Toggle */}
            <button
                className="fixed top-4 left-4 z-50 p-2 rounded-md bg-[#1A1A1A]/80 backdrop-blur-sm text-white shadow-md"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Main Content */}
            <main className="w-full h-full overflow-auto pt-16">
                {children}
            </main>

            {/* Drawer Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1A1A1A]/80 backdrop-blur-md shadow-lg transform transition-transform duration-200 ease-in-out ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="h-full flex flex-col">
                    <div className="p-6 pl-16">
                        <h1 className="text-2xl font-bold text-white">Reborn</h1>
                    </div>
                    <nav className="flex-1 px-4 space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2A2A2A]/80 transition-colors"
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    <span>{item.label}</span>
                                </Link>
                            )
                        })}
                    </nav>
                    <div className="p-4 border-t border-gray-700">
                        <button
                            onClick={logout}
                            className="w-full flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-[#2A2A2A]/80 transition-colors"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    )
} 