'use client';

import { ArcElement, Chart as ChartJs, Legend, Tooltip } from 'chart.js';
import React, { FunctionComponent } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJs.register(ArcElement, Tooltip, Legend);

const DoughnutChart: FunctionComponent<DoughnutChartProps> = ({ accounts }) => {
    const accountsName = accounts.map((account) => account.name);
    const balances = accounts.map((account) => account.currentBalance);

    const data = {
        datasets: [
            {
                label: 'Banks',
                data: balances,
                backgroundColor: ['#0747b6', '#2265d8', '#2f91fa'],
            },
        ],
        labels: accountsName,
    };
    return (
        <Doughnut
            data={data}
            options={{
                cutout: '60%',
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            }}
        />
    );
};

export default DoughnutChart;
