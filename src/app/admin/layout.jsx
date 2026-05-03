'use client';

import Link from 'next/link';
import LogoutButton from '@/components/admin/LogoutButton';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            {/* Top Navigation Bar (Similar to Public Site) */}
            <header className="bg-[#1976D2] h-14 flex items-center px-4 justify-between shadow-md z-30">
                <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-xl font-bold italic tracking-wider">Sabhi</span>
                    <span className="bg-red-500 text-white text-[10px] px-1 py-0.5 rounded font-bold">JOBS</span>
                </div>
                
                <div className="flex items-center gap-4">
                    <LogoutButton />
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-100 flex flex-col z-20 shadow-sm">
                    <div className="p-6 border-b border-gray-50 flex items-center gap-2">
                        <span className="text-2xl font-bold text-[#1976D2]">Sabhi</span>
                        <span className="bg-orange-50 text-[#EF6C00] text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Admin</span>
                    </div>
                    
                    <nav className="flex-1 p-4 space-y-2">
                        <SidebarLink href="/admin/jobs" label="Job Management" icon="💼" />
                        <SidebarLink href="/admin/categories" label="Categories" icon="📁" />
                        <SidebarLink href="/admin/assets" label="Homepage Icons" icon="🏠" />
                        <SidebarLink href="/admin/quick-links" label="Quick Links" icon="🔗" />
                        <SidebarLink href="/admin/faqs" label="FAQs" icon="❓" />
                        <SidebarLink href="/admin/comments" label="Comments" icon="💬" />
                        <SidebarLink href="/admin/contacts" label="Inquiries" icon="✉️" />
                    </nav>


                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-5">
                    {children}
                </main>
            </div>
        </div>
    );
}

function SidebarLink({ href, label, icon }) {
    return (
        <Link href={href} className="flex items-center gap-4 px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-[#1976D2] rounded-xl transition-all font-medium group">
            <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">{icon}</span>
            <span className="text-[15px]">{label}</span>
        </Link>
    );
}


