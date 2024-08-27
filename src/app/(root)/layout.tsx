import Image from 'next/image';

import SideNav from '@/components/SideNav';

import MobileNav from '../../components/MobileNav';
import { getLoggedInUser } from '../../lib/actions/user.actions';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedInUser = await getLoggedInUser();

    return (
        <main className="flex h-screen w-full font-inter">
            <SideNav user={loggedInUser} />
            <div className="flex size-full flex-col">
                <div className="root-layout">
                    <Image
                        src="/icons/logo.svg"
                        width={30}
                        height={30}
                        alt="logo"
                    />
                    <MobileNav user={loggedInUser} />
                </div>
                {children}
            </div>
        </main>
    );
}
