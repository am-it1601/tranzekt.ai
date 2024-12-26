'use client';

import React, { useEffect, useState } from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

// Define Account type
interface Account {
    id: number;
    account_name: string;
    opening_balance: number;
}

// Props for Chart Component
interface AccountsChartProps {
    accounts: Account[];
}

const AccountsChart: React.FC<AccountsChartProps> = ({ accounts }) => {
    const [chartData, setChartData] = useState<{ name: string; balance: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Prepare data for the chart
        const processData = () => {
            const data = accounts.map((account) => ({
                name: account.account_name,
                balance: account.opening_balance,
            }));
            setChartData(data);
            setLoading(false);
        };

        if (accounts.length > 0) {
            processData();
        }
    }, [accounts]);

    // Show loading skeleton
    if (loading) {
        return (
            <div className="h-64 w-full">
                <Skeleton className="h-full w-full rounded-md bg-gray-200" />
            </div>
        );
    }

    return (
        <div className="w-full h-72  bg-white shadow-sm rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
                Account Balances Overview
            </h2>
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0179FE" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#0179FE" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="balance"
                        stroke="#0179FE"
                        fillOpacity={1}
                        fill="url(#colorBalance)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AccountsChart;
