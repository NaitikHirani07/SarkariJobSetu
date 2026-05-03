'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ClientLayoutWrapper({ children, categories }) {
    const pathname = usePathname();
    const isAdminPath = pathname?.startsWith('/admin');

    if (isAdminPath) {
        return (
            <main>
                {children}
            </main>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar categories={categories} />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}
