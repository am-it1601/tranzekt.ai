import './globals.css';

import { IBM_Plex_Serif, Inter } from 'next/font/google';

import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const ibmSerif = IBM_Plex_Serif({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-ibm-serif',
});

export const metadata: Metadata = {
    title: 'Tranzekt.AI',
    description:
        'Tranzekt.Ai is a cutting-edge financial SaaS platform enabling real-time transaction tracking across multiple bank accounts, seamless money transfers between users, and comprehensive financial management, all in one place.',
    icons: {
        icon: '/icons/logo.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${ibmSerif.variable}`}>{children}</body>
        </html>
    );
}
