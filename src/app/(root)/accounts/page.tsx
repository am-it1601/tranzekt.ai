'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import accountDataJson from '@/data/data.json'; // Assuming this file contains your account data
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserRoundPen } from 'lucide-react';

// Define Account type
interface Account {
    id: string; // Account ID (Assuming it's unique and of type string)
    account_type: string;
    account_name: string;
    opening_balance: number;
    description: string;
}


const Page = () => {
    const router = useRouter();
    
    // State for holding accounts list and the account being edited
    const [accounts, setAccounts] = useState<Account[]>(accountDataJson); // type accounts as an array of Account objects
    const [editAccount, setEditAccount] = useState<Account | null>(null); // type editAccount as Account or null

    // Function to navigate to add account page
    const navigateToAdd = () => {
        router.push('/accounts/Add');
    };

    // Function to handle editing an account
    const handleEdit = (account: Account) => {
        setEditAccount({ ...account });
    };

    // Function to save the edited account
    const handleSave = () => {
        if (editAccount) {
            const updatedAccounts = accounts.map((account) =>
                account.id === editAccount.id ? editAccount : account
            );
            setAccounts(updatedAccounts);
            setEditAccount(null); // Close the edit form after saving
        }
    };

    // Function to delete an account by ID
    const handleDelete = (id: string) => {
        const updatedAccounts = accounts.filter((account) => account.id !== id);
        setAccounts(updatedAccounts);
    };

    // Handle changes in the input fields of the edit form
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>
  ) => {
      // Ensure editAccount is not null before making changes
      if (editAccount) {
          const { name, value } = e.target;

          // Handle each field based on its name
          if (name === 'opening_balance') {
              setEditAccount((prev) => ({
                  ...prev!,
                  [name]: parseFloat(value), // Convert to number if it's opening_balance
              }));
          } else {
              setEditAccount((prev) => ({
                  ...prev!,
                  [name]: value,
              }));
          }
      }
  };

    return (
        <>
            {/* Add Account Button */}
            <div className="p-4 mt-3 text-right pr-6">
                <Button
                    onClick={navigateToAdd}
                    className="bg-[#0179FE] font-medium text-white"
                >
                    <Plus /> Add Account
                </Button>
            </div>

            <div className="h-auto px-6 w-full">
                <h2 className="text-xl font-semibold mt-8">Accounts List</h2>

                {/* Table to display account list */}
                <Table className="mt-4 w-full">
                    <TableHeader className="bg-[#0179FE] text-white">
                        <TableRow>
                            <TableHead>Account Type</TableHead>
                            <TableHead>Account Name</TableHead>
                            <TableHead>Opening Balance</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {accounts.map((account) => (
                            <TableRow key={account.id}>
                                <TableCell>{account.account_type}</TableCell>
                                <TableCell>{account.account_name}</TableCell>
                                <TableCell>{account.opening_balance}</TableCell>
                                <TableCell>{account.description}</TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => handleEdit(account)}
                                        className="bg-[#0179FE] text-white px-1  items-center py-1 rounded-full mr-2"
                                    >
                                         <UserRoundPen />
                                    </button>
                                    {/* <button
                                        onClick={() => handleDelete(account.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Edit Form */}
                {editAccount && (
                    <div className="my-8">
                        <h3 className="text-xl pb-4 font-semibold">Update Account</h3>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="account_type" className="block text-sm font-medium">
                                    Account Type
                                </label>
                                <input
                                    type="text"
                                    id="account_type"
                                    name="account_type"
                                    value={editAccount.account_type}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2 mt-1"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="account_name" className="block text-sm font-medium">
                                    Account Name
                                </label>
                                <input
                                    type="text"
                                    id="account_name"
                                    name="account_name"
                                    value={editAccount.account_name}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2 mt-1"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="opening_balance" className="block text-sm font-medium">
                                    Opening Balance
                                </label>
                                <input
                                    type="number"
                                    id="opening_balance"
                                    name="opening_balance"
                                    value={editAccount.opening_balance}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2 mt-1"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={editAccount.description}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2 mt-1"
                                />
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="bg-[#0179FE] text-white px-4 py-2 rounded"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditAccount(null)}
                                    className="bg-gray-300  px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default Page;
