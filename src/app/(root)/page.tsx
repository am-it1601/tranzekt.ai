import React from 'react';

import HeaderBox from '../../components/HeaderBox';
import RecentTransaction from '../../components/RecentTransaction';
import RightSideInfoBox from '../../components/RightSideInfoBox';
import TotalBalanceBox from '../../components/TotalBalanceBox';
import { getAccount, getAccounts } from '../../lib/actions/bank.actions';
import { getLoggedInUser } from '../../lib/actions/user.actions';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
    const currentPage = Number(page as string) || 1;
    const loggedInUser = await getLoggedInUser();
    const accounts =
        loggedInUser && (await getAccounts({ userId: loggedInUser.$id }));

    if (!accounts) return;

    const accountData = accounts?.data;
    const appwriteItemId = (id as string) || accountData[0]?.appwriteItemId;
    const account = await getAccount({ appwriteItemId });

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedInUser?.firstName || 'Guest'}
                        subtext="Access & Manage your account and Transaction Efficiently"
                    />

                    <TotalBalanceBox
                        accounts={accountData}
                        totalBanks={accounts?.totalBanks}
                        totalCurrentBalance={accounts?.totalCurrentBalance}
                    />
                </header>
                <RecentTransaction
                    accounts={accountData}
                    appwriteItemId={appwriteItemId}
                    transactions={account?.transactions}
                    page={currentPage}
                />
            </div>
            <RightSideInfoBox
                user={loggedInUser}
                banks={accountData?.slice(0, 2)}
                transactions={account?.transactions}
            />
        </section>
    );
};

export default Home;
