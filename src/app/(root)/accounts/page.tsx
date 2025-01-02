import { getAccounts, getAllAccounts } from '@/lib/accounts';
import { Button } from '@/components/ui/button';
import { DollarSign, Plus, TrendingDown, TrendingUp } from 'lucide-react';
import AccountsTable from '@/components/fearures/accounts/AccountsTable';
import Link from 'next/link';
import AccountsSummary from '@/components/fearures/accounts/AccountsSummary';
import { BarChartDouble } from '@/components/BarChartDouble';
import { IncomeExpenseChart } from '@/components/IncomeExpenseChart';

interface Account {
    id: number;
    account_name: string;
    account_type: string;
    opening_balance: number;
    description: string;
}

// Server-side Component
const Page = async () => {
    try {
        // Fetch accounts directly on the server
        const accounts: Account[] = await getAccounts();
        const allAccount: [] = await getAllAccounts();


        return (
            <div className="transactions">
                {/* Header Section */}
                <div className="bg-white shadow-sm rounded-lg p-4 mt-3 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Accounts Overview</h1>
                        <p className="text-sm text-gray-500">Manage your bank accounts, balances, and details effortlessly.</p>
                    </div>
                    <Link href="/accounts/Add">
                        <Button className="bg-[#0179FE] text-white">
                            <Plus className="mr-2" /> Add Account
                        </Button>
                    </Link>
                </div>

                 {/* Area Chart Section */}
                 {/* <div className="my-6">
                    <AreaChartStaked />
                </div> */}
                {/* Summary Cards */}
                 <div>
                    <AccountsSummary/>
                 </div>
                    <IncomeExpenseChart />
                    {/* <BarChartDouble /> */}
                {/* Accounts Table Section */} 
                <section>
                    <AccountsTable accounts={allAccount} />
                </section>
            </div>
        );
    } catch (error) {
        console.error('Error fetching accounts:', error);
        return <div>Error loading accounts data. Please try again later.</div>;
    }
};

export default Page;
