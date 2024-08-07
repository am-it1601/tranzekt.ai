import Image from 'next/image';

import SideNav from '@/components/SideNav';

import MobileNav from '../../components/MobileNav';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedInUser = {
        firstName: 'Amit',
        lastName: 'Agarwal',
    };

    return (
        <main className="flex h-screen w-full font-inter">
            <SideNav user={loggedInUser as User} />
            <div className="flex size-full flex-col">
                <div className="root-layout">
                    <Image
                        src="/icons/logo.svg"
                        width={30}
                        height={30}
                        alt="logo"
                    />
                    <MobileNav user={{} as User} />
                </div>
                {children}
            </div>
        </main>
    );
}
