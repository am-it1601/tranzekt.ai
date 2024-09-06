'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';

import { createLinkToken, exchangePublicToken } from '../lib/actions/plaid.actions';
import { Button } from './ui/button';

const PlaidLinkAccount: React.FunctionComponent<PlaidLinkProps> = ({
    user,
    variant,
}) => {
    const router = useRouter();
    const onSuccess = useCallback<PlaidLinkOnSuccess>(
        async (public_token: string) => {
            await exchangePublicToken({
                publicToken: public_token,
                user,
            });

            router.push('/');
        },
        [user, router]
    );

    const [token, setToken] = useState('');
    const plaidConfig: PlaidLinkOptions = {
        token,
        onSuccess,
    };

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);
            setToken(data?.token);
        };
        getLinkToken();
    }, [user]);

    const { open, ready } = usePlaidLink(plaidConfig);
    return (
        <>
            {variant === 'primary' ? (
                <Button
                    className="plaidlink-primary"
                    disabled={!ready}
                    onClick={() => open()}
                >
                    Connect Bank
                </Button>
            ) : variant === 'ghost' ? (
                <Button onClick={() => open()} className="plaidlink-ghost">
                    <Image
                        src="/icons/connect-bank.svg"
                        alt="connect bank"
                        width={24}
                        height={24}
                    />
                    <p className="hiddenl text-[16px] font-semibold text-black-2 xl:block">
                        Connect bank
                    </p>
                </Button>
            ) : (
                <Button onClick={() => open()} className="plaidlink-default">
                    <Image
                        src="/icons/connect-bank.svg"
                        alt="connect bank"
                        width={24}
                        height={24}
                    />
                    <p className="text-[16px] font-semibold text-black-2">
                        Connect bank
                    </p>
                </Button>
            )}
        </>
    );
};

export default PlaidLinkAccount;
