'use client';
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
        [user]
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
                <Button className="plaidlink-primary" disabled={!ready}>
                    Connect Bank
                </Button>
            ) : variant === 'ghost' ? (
                <Button>Connect Bank</Button>
            ) : (
                <Button>Connect Bank</Button>
            )}
        </>
    );
};

export default PlaidLinkAccount;
