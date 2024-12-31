
'use client';
import React, { useState } from 'react';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import BankAccountForm from '@/components/fearures/accounts/BankAccountForm';
import CashAccountForm from '@/components/fearures/accounts/CashAccountForm';
import CreditCardAccountForm from '@/components/fearures/accounts/CreditCardAccountForm';
import { useRouter } from 'next/navigation';

const AddAccountPage = () => {
    const [accountType, setAccountType] = useState(''); // Account type state is initially empty
    const router = useRouter(); // Initialize router

    const renderAccountForm = () => {
        switch (accountType) {
            case 'Bank account':
                return <BankAccountForm accountType="Bank account" mode="add"/>;
            case 'Cash account':
                return <CashAccountForm accountType="Cash account" mode="add" />;
            case 'Credit Card account':
                return <CreditCardAccountForm accountType="Credit Card account" mode="add" />;
            default:
                return null;
        }
    };

    return (
        <section className='p-8  bg-white rounded-lg'>
            {!accountType && (
                <div className="text-start mb-8">
                    <h2 className="text-3xl font-bold text-[#0179FE] mb-2">Add New Account</h2>
                    <p className="text-gray-500">Choose an account type to get started</p>
                </div>
            )}

            {/* Show select dropdown if no account type is selected */}
            {!accountType && (
                <div className="mb-8">
                    <label className="block text-gray-700 font-semibold mb-2">Account Type</label>
                    <Select value={accountType} onValueChange={setAccountType}>
                        <SelectTrigger className="max-w-sm bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-[#0179FE] focus:border-[#0179FE] shadow-sm">
                            {accountType || "Select Account Type"}
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 rounded-md shadow-md">
                            <SelectItem value="Bank account" className="hover:bg-[#0179FE] hover:text-white p-2 rounded-md">Bank Account</SelectItem>
                            <SelectItem value="Cash account" className="hover:bg-[#0179FE] hover:text-white p-2 rounded-md">Cash Account</SelectItem>
                            <SelectItem value="Credit Card account" className="hover:bg-[#0179FE] hover:text-white p-2 rounded-md">Credit Card Account</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Render form based on selected account type */}
            <div>
                {renderAccountForm()}
            </div>
        </section>
    );
};

export default AddAccountPage;
