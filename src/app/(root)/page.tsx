import React from 'react';

import HeaderBox from '../../components/HeaderBox';
import RightSideInfoBox from '../../components/RightSideInfoBox';
import TotalBalanceBox from '../../components/TotalBalanceBox';

const Home = () => {
    const loggedInUser = {
        firstName: 'Amit',
        email: 'amit.agarwal@ciphercru.com',
    };
    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedInUser.firstName || 'Guest'}
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
                user={loggedInUser as User}
                banks={
                    [
                        {
                            currentBalance: 2000.62,
                        },
                        {
                            currentBalance: 1250.53,
                        },
                    ] as Account[]
                }
                transactions={[]}
            />
        </section>
    );
};

export default Home;
