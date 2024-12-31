"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchAccounts } from '@/lib/fetchAccounts'; // For API call (if dynamic)
import CountUp from 'react-countup';
import { HandCoins, Landmark, ReceiptIndianRupee } from 'lucide-react';

interface Account {
  id: number;
  account_type: string;
  account_name: string;
  opening_balance: number;
  description: string;
}

const AccountsSummary = () => {
  const [bankBalance, setBankBalance] = useState(0);
  const [cashBalance, setCashBalance] = useState(0);
  const [totalLoans, setTotalLoans] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Account[] = await fetchAccounts(); // Fetch accounts data

        // Calculate total balances
        const bankTotal = data
          .filter((account) => account.account_type === 'Bank account')
          .reduce((acc, curr) => acc + curr.opening_balance, 0);

        const cashTotal = data
          .filter((account) => account.account_type === 'Cash account')
          .reduce((acc, curr) => acc + curr.opening_balance, 0);

        const loansTotal = data
          .filter((account) => account.account_type === 'Loan')
          .reduce((acc, curr) => acc + curr.opening_balance, 2);

        // Set state values after the calculation
        setBankBalance(bankTotal);
        setCashBalance(cashTotal);
        setTotalLoans(loansTotal);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      }
    };

    fetchData();
  }, []);

  // Counting effect
  const countUp = (value: number) => {
    return (
      <span className="count-up" style={{ fontSize: '2rem' }}>
        ${new Intl.NumberFormat().format(value)}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-0 py-6">
            {/* Bank Balance Card */}
            <Card className="border border-[#0179FE] shadow-lg">
                <CardHeader className="bg-[#0179FE] text-white rounded-t-lg">
                    <CardTitle className="text-xl flex gap-2"> <> <Landmark /> Bank Balance </></CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <p className="text-4xl font-bold text-[#0179FE]">₹<CountUp start={0} end={bankBalance} duration={2} separator="," /></p>
                    <p className="mt-2 text-gray-600">Your financial stability is growing!</p>
                </CardContent>
            </Card>

            {/* Cash Balance Card */}
            <Card className="border border-green-500 shadow-lg">
                <CardHeader className="bg-green-500 text-white rounded-t-lg">
                    <CardTitle className="text-xl flex gap-2"> <><HandCoins />Cash Balance </> </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <p className="text-4xl font-bold text-green-500">₹<CountUp start={0} end={cashBalance} duration={2} separator=","  /></p>
                    <p className="mt-2 text-gray-600">Great cash flow management!</p>
                </CardContent>
            </Card>

            {/* Total Loans Card */}
            <Card className="border border-red-500 shadow-lg">
                <CardHeader className="bg-red-500 text-white rounded-t-lg">
                    <CardTitle className="text-xl flex gap-2"> <> <ReceiptIndianRupee /> </> Total Loans</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <p className="text-4xl font-bold text-red-500"><CountUp start={0} end={totalLoans} duration={2} separator=","  /></p>
                    <p className="mt-2 text-gray-600">Monitor your liabilities closely.</p>
                </CardContent>
            </Card>
        </div>
  );
};

export default AccountsSummary;
