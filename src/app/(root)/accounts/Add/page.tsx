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
    const [accountType, setAccountType] = useState(''); // Account type state
    const router = useRouter(); // Initialize router

    // Render account form dynamically
    const renderAccountForm = () => {
        switch (accountType) {
            case 'Bank account':
                return <BankAccountForm accountType="Bank account" mode="add" />;
            case 'Cash account':
                return <CashAccountForm accountType="Cash account" mode="add" />;
            case 'Credit Card account':
                return <CreditCardAccountForm accountType="Credit Card account" mode="add" />;
            default:
                return null;
        }
    };

    return (
        <section className='p-8 bg-white rounded-lg shadow-md max-w-6xl mx-10'>
            {/* Header Section */}
            <div className="text-start mb-8">
                <h2 className="text-3xl font-bold text-[#0179FE] mb-2">Add New Account</h2>
                {/* <p className="text-gray-500 ">Select an account type to get started</p> */}
            </div>

            {/* Account Type Dropdown */}
            <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-2 text-lg">Account Type</label>
                <Select value={accountType} onValueChange={setAccountType}>
                    <SelectTrigger className="max-w-sm bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-[#0179FE] focus:border-[#0179FE] shadow-sm">
                        {accountType || "Select Account Type"}
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg">
                        <SelectItem value="Bank account" className="hover:bg-[#0179FE] hover:text-white p-2 rounded-md">
                            Bank Account
                        </SelectItem>
                        <SelectItem value="Cash account" className="hover:bg-[#0179FE] hover:text-white p-2 rounded-md">
                            Cash Account
                        </SelectItem>
                        <SelectItem value="Credit Card account" className="hover:bg-[#0179FE] hover:text-white p-2 rounded-md">
                            Credit Card Account
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Dynamic Form Section */}
            <div className='mt-8 border-t pt-6'>
                {accountType ? (
                    <div>
                        {renderAccountForm()}
                    </div>
                ) : (
                    <p className='text-gray-500 text-start'>Please select an account type to proceed.</p>
                )}
            </div>
        </section>
    );
};

export default AddAccountPage;
