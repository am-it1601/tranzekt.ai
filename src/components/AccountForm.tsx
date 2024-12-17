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

    // const form = useForm<AccountFormValues>({
    //     resolver: zodResolver(AccountSchema),
    //     defaultValues: {
    //         account_type: 'Bank account',
    //         account_name: '',
    //         opening_balance: '',
    //         description: '',
    //     },
    // });
    const form = useForm<AccountFormValues>({
        resolver: zodResolver(AccountSchema),
        defaultValues: accountData || {
            account_type:  'Bank account',
            account_name: '',
            opening_balance: '',
            description: '',
        },
    });
    // Fetch account data for edit mode
    useEffect(() => {
        if (isEditMode) {
            const fetchAccount = async () => {
                const response = await fetch(
                    `/api/accounts/${params.id}`
                );
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
        <div className="p-6 w-2/5">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField 
                        name="account_type"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account Type</FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger>
                                            {field.value ||
                                                'Select account type'}
                                        </SelectTrigger>
                                        <SelectContent className='bg-white'>
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
                                <FormLabel>Account Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
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
                                <FormLabel>Opening Balance</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="Enter opening balance"
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
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Enter description"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-[#0179FE] text-white">
                        {isEditMode ? 'Update Account' : 'Add Account'}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AccountForm;
