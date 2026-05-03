import './globals.css';
import { ShopContextProvider } from '@/context/ShopContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    metadataBase: new URL('https://sarkarirojgarsetu.com'),
    title: {
        default: 'Sarkari Rojgar Setu - Latest Government Jobs & Sarkari Result 2026',
        template: '%s | Sarkari Rojgar Setu'
    },
    description: 'Find the latest government job notifications, Sarkari Result, admit cards, and answer keys. Explore Railway, Bank, Defence, Police, and more government jobs across India.',
    keywords: ['government jobs', 'sarkari naukri', 'sarkari result', 'railway jobs', 'bank jobs', 'defence jobs', 'police jobs', 'teaching jobs', 'central govt jobs'],
    authors: [{ name: 'Sarkari Rojgar Setu Team' }],
    creator: 'Sarkari Rojgar Setu',
    publisher: 'Sarkari Rojgar Setu',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Sarkari Rojgar Setu - Latest Government Jobs & Sarkari Result',
        description: 'Find the latest government job notifications, Sarkari Result, and admit cards.',
        url: 'https://sarkarirojgarsetu.com',
        siteName: 'Sarkari Rojgar Setu',
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sarkari Rojgar Setu - Latest Government Jobs',
        description: 'Find the latest government job notifications, Sarkari Result, and admit cards.',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

import { getAssetCategories } from '@/lib/fetchers';

import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

export default async function RootLayout({ children }) {
    const categories = await getAssetCategories();
    
    return (
        <html lang="en">
            <body>
                <ShopContextProvider>
                    <ClientLayoutWrapper categories={categories}>
                        {children}
                    </ClientLayoutWrapper>
                </ShopContextProvider>
            </body>
        </html>
    );
}
