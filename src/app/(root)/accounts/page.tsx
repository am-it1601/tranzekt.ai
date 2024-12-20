'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Plus, Edit3 } from 'lucide-react';
import AccountsTable from '@/components/fearures/accounts/AccountsTable';





const Page = () => {
    const router = useRouter();

    const navigateToAdd = () => {
        router.push('/accounts/Add');
    };

    return (
        <div className="transactions">
            {/* Header Section */}
            <div className="bg-white shadow-sm rounded-lg p-4 mt-3 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Accounts Overview</h1>
                    <p className="text-sm text-gray-500">Manage your bank accounts, balances, and details effortlessly.</p>
                </div>
                <Button
                    onClick={navigateToAdd}
                    className="bg-[#0179FE] text-white"
                >
                    <Plus className="mr-2" /> Add Account
                </Button>
            </div>

            {/* Accounts Table Section */}
            <section className="flex w-full flex-col gap-6">
                <AccountsTable />
            </section>
        </div>
    );
};

export default Page;
