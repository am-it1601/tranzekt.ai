import React from 'react';

import HeaderBox from '../../components/HeaderBox';
import TotalBalanceBox from '../../components/TotalBalanceBox';

const Home = () => {
    const loggedInUser = {
        firstName: 'Amit',
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
                </header>
                <TotalBalanceBox accounts={[]} totalBanks={5} totalCurrentBalance={2000.0} />
            </div>
        </section>
    );
};

export default Home;
