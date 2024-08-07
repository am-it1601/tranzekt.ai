'use client';
import React, { FunctionComponent } from 'react';
import CountUp from 'react-countup';

const AnimatedCounter: FunctionComponent<{ amount: number }> = ({ amount }) => {
    return (
        <div className="w-full">
            <CountUp
                end={amount}
                decimal="."
                prefix="$"
                duration={2.75}
                decimals={2}
            />
        </div>
    );
};

export default AnimatedCounter;
