'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation Schema
const AccountTypeSchema = z.enum([
    'Bank account',
    'Cash account',
    'Credit Card account',
    'Checking account',
]);
const AccountSchema = z.object({
    account_type: AccountTypeSchema,
    account_name: z.string().min(1, 'Account name is required'),
    opening_balance: z.string().optional(),
    description: z.string().optional(),
});

type AccountFormValues = z.infer<typeof AccountSchema>;

const AccountForm = ({
    accountData,
    mode = 'add', // Default mode is 'add'
}: {
    accountData?: AccountFormValues;
    mode?: 'add' | 'edit';
}) => {
    const router = useRouter();
    const params = useParams();
    const isEditMode = !!params.id;

    const form = useForm<AccountFormValues>({
        resolver: zodResolver(AccountSchema),
        defaultValues: accountData || {
            account_type: 'Bank account',
            account_name: '',
            opening_balance: '',
            description: '',
        },
    });

    useEffect(() => {
        if (isEditMode) {
            const fetchAccount = async () => {
                const response = await fetch(`/api/accounts/${params.id}`);
                const data = await response.json();
                form.reset(data);
            };
            fetchAccount();
        }
    }, [isEditMode, params.id, form]);

    const onSubmit = async (data: AccountFormValues) => {
        const method = isEditMode ? 'PUT' : 'POST';
        const url = isEditMode ? `/api/accounts/${params.id}` : '/api/accounts';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            router.push('/accounts');
        } else {
            console.error('Error saving account:', response.statusText);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <h2 className="text-2xl font-semibold text-[#0179FE]">
                        {isEditMode ? 'Edit Account' : 'Create New Account'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            name="account_type"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-semibold">
                                        Account Type
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={isEditMode}
                                        >
                                            <SelectTrigger
                                                className={`bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-[#0179FE] ${isEditMode ? 'cursor-not-allowed bg-gray-100' : ''}`}
                                            >
                                                {field.value ||
                                                    'Select account type'}
                                            </SelectTrigger>
                                            {!isEditMode && (
                                                <SelectContent className="bg-white">
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
                                                </SelectContent>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="account_name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-semibold">
                                        Account Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="w-full bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-[#0179FE]"
                                            placeholder="Enter account name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="opening_balance"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-semibold">
                                        Opening Balance
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            className={`w-full bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-[#0179FE] ${isEditMode ? 'cursor-not-allowed bg-gray-100' : ''}`}
                                            placeholder="Enter opening balance"
                                            disabled={isEditMode}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-semibold">
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            className="w-full bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-[#0179FE]"
                                            placeholder="Enter description"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-x-4 justify-start">
                        <Button
                            type="submit"
                            className="bg-[#0179FE] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#005bb5] focus:ring-2 focus:ring-offset-2 focus:ring-[#0179FE]"
                        >
                            {isEditMode ? 'Update Account' : 'Add Account'}
                        </Button>
                        <Button
                            type="button"
                            onClick={() => router.push('/accounts')}
                            className="bg-[#F9FAFB] text-gray-700 px-6 py-3 rounded-md font-semibold hover:bg-[#EAECF0] border border-[#EAECF0] focus:ring-2 focus:ring-offset-2 focus:ring-[#EAECF0]"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default AccountForm;
