import React from 'react';

import CreditCard from '../../../components/CreditCard';
import HeaderBox from '../../../components/HeaderBox';
import { getAccounts } from '../../../lib/actions/bank.actions';
import { getLoggedInUser } from '../../../lib/actions/user.actions';

const MyBanks = async () => {
    const loggedInUser = await getLoggedInUser();
    const accounts = await getAccounts({ userId: loggedInUser.$id });

    return (
        <section className="flex">
            <div className="my-banks">
                <HeaderBox
                    title="Bank Accounts"
                    subtext="Effortlessly manage your bank accounts"
                />
                <div className="space-y-4">
                    <h2 className="header-2">Your Cards</h2>
                    <div className="flex flex-wrap gap-6">
                        {accounts &&
                            accounts.data.map((acc) => (
                                <CreditCard
                                    key={acc.id}
                                    account={acc}
                                    userName={`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyBanks;
