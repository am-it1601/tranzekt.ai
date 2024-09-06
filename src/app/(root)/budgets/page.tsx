import React from 'react';

import HeaderBox from '../../../components/HeaderBox';
import { formatAmount } from '../../../lib/utils';

const page = () => {
    return (
        <div className="transactions">
            <div className="transactions-header">
                <HeaderBox
                    title="Manage Your Budgets"
                    subtext="Track, allocate, and optimize your finances to reach your goals with ease."
                />
            </div>
            <div className="budget-summary">
                <div className="budget-estimate-savings">
                    <p className="text-14">Estimated Savings</p>
                    <p className="text-24 text-center font-bold">
                        {formatAmount(100)}
                    </p>
                </div>

                <div>-</div>
                <div className="budget-estimate-card">
                    <p className="text-14">Overspent</p>
                    <p className="text-24 text-center font-bold">
                        {formatAmount(20)}
                    </p>
                </div>
                <div>=</div>
                <div className="budget-estimate-card">
                    <p className="text-14">Final Estimated Savings</p>
                    <p className="text-24 text-center font-bold">
                        {formatAmount(80)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default page;
