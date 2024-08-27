import React from 'react';

import HeaderBox from '../../components/HeaderBox';
import RightSideInfoBox from '../../components/RightSideInfoBox';
import TotalBalanceBox from '../../components/TotalBalanceBox';
import { getLoggedInUser } from '../../lib/actions/user.actions';

const Home = async () => {
    const loggedInUser = await getLoggedInUser();
    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedInUser?.name || 'Guest'}
                        subtext="Access & Manage your account and Transaction Efficiently"
                    />

                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={5}
                        totalCurrentBalance={2000.0}
                    />
                </header>
                RECENT Transactions
            </div>
            <RightSideInfoBox
                user={loggedInUser as any}
                banks={
                    [
                        {
                            currentBalance: 2000.62,
                        },
                        {
                            currentBalance: 1250.53,
                        },
                    ] as Account[] & Bank[]
                }
                transactions={[]}
            />
        </section>
    );
};

export default Home;
