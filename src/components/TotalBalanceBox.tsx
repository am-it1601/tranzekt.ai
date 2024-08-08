'use client';

import React, { FunctionComponent } from 'react';
import CountUp from 'react-countup';

import { formatAmount } from '../lib/utils';
import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';

const TotalBalanceBox: FunctionComponent<TotalBalanceBoxProps> = ({
    accounts = [],
    totalCurrentBalance = 0.0,
    totalBanks = 0.0,
}) => {
    return (
        <div className="total-balance">
            <div className="total-balance-chart">
                <DoughnutChart accounts={accounts} />
            </div>
            <div className="flex flex-col gap-6">
                <h2 className="header-2">{totalBanks} Bank Accounts</h2>
                <div className="flex flex-col gap-2">
                    <p className="total-balance-label">Total Current Balance</p>
                    <div className="total-balance-amount flex-center gap-2">
                        <AnimatedCounter amount={totalCurrentBalance} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalBalanceBox;
