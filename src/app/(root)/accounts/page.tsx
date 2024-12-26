
import { getAccounts } from '@/lib/accounts';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AccountsTable from '@/components/fearures/accounts/AccountsTable';
import Link from 'next/link';

interface Account {
    id: number;
    account_name: string;
    account_type: string;
    opening_balance: number;
    description: string;
}

// Server-side Component
const Page = async () => {
    let accounts: Account[] = [];

    try {
        accounts = await getAccounts(); // Fetch accounts directly on the server

    
    } catch (error) {
        console.error('Error fetching accounts:', error);
    }

    // const navigateToAdd = () => {
    //     window.location.href = '/accounts/Add';
    // };

    return (
        <div className="transactions">
            {/* Header Section */}
            <div className="bg-white shadow-sm rounded-lg p-4 mt-3 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Accounts Overview</h1>
                    <p className="text-sm text-gray-500">Manage your bank accounts, balances, and details effortlessly.</p>
                </div>
                    <Link href='/accounts/Add'> 
                <Button  className="bg-[#0179FE] text-white">
                    <Plus className="mr-2" /> Add Account
                </Button>
                    </Link>
            </div>

            {/* Accounts Table Section */}
            <section className="">
                <AccountsTable accounts={accounts} />
            </section>
        </div>
    );
};

export default Page;
