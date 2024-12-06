'use client'; // This makes the component a Client Component

import React, { useState } from 'react';
import HeaderBox from '@/components/HeaderBox';

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectGroup,
} from '@/components/ui/select';

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { useRouter } from 'next/navigation';

type AccountType =
    | 'Bank account'
    | 'Cash account'
    | 'Credit Card account'
    | 'Checking account';
const AccountTypeSchema = z.enum([
    'Bank account',
    'Cash account',
    'Credit Card account',
    'Checking account',
]);

// Define the full Account schema
const AccountSchema = z.object({
    account_type: AccountTypeSchema, // Account type must match one of the enum values
    account_name: z.string().min(1, 'Account name is required'), // Account name is required and must be a string
    opening_balance: z.string().optional(),
    //   refine(val => !isNaN(parseFloat(val)), {
    //     message: "Opening balance must be a number", // Custom message if opening balance is not a number
    //   }).transform(val => parseFloat(val)), // Convert openingBalance to number
    description: z.string().optional(), // Description is optional
});

interface Account {
    accountType: AccountType;
    accountName: string;
    openingBalance: string;
    description: string;
}

const AccountForm = () => {
    const router = useRouter();

    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const form = useForm<z.infer<typeof AccountSchema>>({
        resolver: zodResolver(AccountSchema),
        defaultValues: {
            account_type: 'Bank account',
            account_name: '',
            opening_balance: '', // Initial value is a string, since form inputs default to strings
            description: '',
        },
    });
    // Handle form submission
    const onSubmit = async (data: any) => {
        try {
            // Send a POST request to the API route with form data
            const response = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(data), // Send the form data as JSON
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message); // You can use this message in your UI (e.g., show a success popup)

                // Optionally reset the form
                form.reset();

                router.push('/accounts');
            } else {
                console.error('Failed to save account:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }

        // setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
        // setIsModalOpen(true);
    };

    return (
        <div className="w-full mx-auto p-6">
            <HeaderBox title="Add New Account" subtext="" />
            <Form {...form}>
                {/* Account Form with ShadCN Form Components and React Hook Form */}
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 flex w-2/6 flex-col justify-center pt-0"
                >
                    {/* Account Type */}
                    <FormField
                        name="account_type"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account Type</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field} // This binds the Select to react-hook-form
                                        onValueChange={(value) =>
                                            field.onChange(value)
                                        } // Manually handle value change
                                    >
                                        <SelectTrigger className="w-full p-2 border rounded-md">
                                            <span>
                                                {field.value ||
                                                    'Select an account type'}
                                            </span>
                                        </SelectTrigger>
                                        <SelectContent className="focus:ring-blue-500 bg-white focus:border-blue-500 focus:outline-none">
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Choose Account Type
                                                </SelectLabel>
                                                <SelectItem value="Bank account">
                                                    Bank Account
                                                </SelectItem>
                                                <SelectItem value="Cash account">
                                                    Cash Account
                                                </SelectItem>
                                                <SelectItem value="Credit Card account">
                                                    Credit Card Account
                                                </SelectItem>
                                                <SelectItem value="Checking account">
                                                    Checking Account
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Account Name */}
                    <FormField
                        name="account_name"
                        control={form.control}
                        rules={{ required: 'Account name is required' }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter account name"
                                        className="w-full p-2 border rounded-md"
                                    />
                                </FormControl>

                                <FormMessage className="form-message mt-2" />
                            </FormItem>
                        )}
                    />

                    {/* Opening Balance */}
                    <FormField
                        name="opening_balance"
                        control={form.control}
                        rules={{
                            required: 'Opening balance is required',
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Opening Balance</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="Enter opening balance"
                                        className="w-full p-2 border rounded-md"
                                    />
                                </FormControl>

                                <FormMessage className="form-message mt-2" />
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Enter account description"
                                        className="w-full p-2 border rounded-md"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}

                    <Button
                        type="submit"
                        className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Add Account
                    </Button>
                </form>
            </Form>

            {/* Accounts Table */}

            {/* Modal for success message */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogTitle>Success</DialogTitle>
                    <DialogDescription>
                        Your account has been added successfully!
                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={() => setIsModalOpen(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AccountForm;
