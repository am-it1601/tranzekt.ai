import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { logoutAccount } from '../lib/actions/user.actions';

const BottomNav: React.FunctionComponent<FooterProps> = ({
    user,
    type = 'desktop',
}) => {
    const router = useRouter();

    const handleSignOut = async () => {
        const signOut = await logoutAccount();

        if (signOut) router.push('/sign-in');
    };

    return (
        <footer className="footer">
            <div
                className={
                    type == 'desktop' ? 'footer_name' : 'footer_name-mobile'
                }
            >
                <p className="text-xl font-bold text-gray-700">
                    {user.name[0]}
                </p>
            </div>
            <div
                className={
                    type == 'desktop' ? 'footer_email' : 'footer_email-mobile'
                }
            >
                <h1 className="text-14 truncate font-semibold text-gray-700">
                    {user.name}
                </h1>
                <p className="text-14 truncate font-normal text-gray-600">
                    {user.email}
                </p>
            </div>
            <div className="footer_image">
                <Image
                    src="/icons/logout.svg"
                    fill
                    alt="end_session"
                    onClick={handleSignOut}
                />
            </div>
        </footer>
    );
};

export default BottomNav;
