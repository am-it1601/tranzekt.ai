'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Edit3 } from 'lucide-react';
import TransactionsTable from '@/components/fearures/Transactions/TransactionsTable'; // Import TransactionsTable component

interface Account {
    account_name: string;
    account_type: string;
    opening_balance: number;
    description: string;
    id: string; // Assuming the account object includes an `id` field.
}

const AccountDetails: React.FC<{ account: Account | null }> = ({ account }) => {
    const router = useRouter();

    if (!account) {
        return <p>No account details available.</p>;
    }

    const handleEdit = () => {
        router.push(`/accounts/${account.id}?mode=edit`); // Navigate to the edit page with `mode=edit`
    };

    const handleCancel = () => {
        router.push('/accounts'); // Navigate back to the accounts list
    };

    return (
        <div className="container bg-gray-25  mx-auto p-6 ">
            {/* Account Details Section */}
            <div className="border rounded-lg p-6 bg-[#0179FE] shadow space-y-4">
                <div className="flex justify-between  items-start">
                    <div>
                        <h1 className="text-2xl text-white font-bold">
                            {account.account_name}
                        </h1>
                        <p className="text-gray-100">{account.description}</p>
                    </div>
                    <button
                        onClick={handleEdit}
                        className="text-[#0179FE] hover:text-[#005BBB] flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md shadow-sm hover:shadow-md"
                        aria-label="Edit Account"
                    >
                        <Edit3 className="h-5 w-5" />
                        <span className="text-sm font-medium">Edit</span>
                    </button>
                </div>

                {/* Account Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            Account Type
                        </h2>
                        <p className="text-gray-100">{account.account_type}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            Opening Balance
                        </h2>
                        <p className="text-gray-100">
                            {account.opening_balance}
                        </p>
                    </div>
                </div>
            </div>

            {/* Transactions Section */}
            <section className="mt-6">
                <h2 className="text-xl font-semibold mb-4">
                    Recent Transactions
                </h2>
                <TransactionsTable />
            </section>

            {/* Cancel Button */}
            <div className="mt-6">
                <button
                    onClick={handleCancel}
                    className="bg-[#F9FAFB] border border-[#EAECF0] px-4 py-2 rounded-md text-gray-700 hover:bg-[#EAECF0]"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AccountDetails;
