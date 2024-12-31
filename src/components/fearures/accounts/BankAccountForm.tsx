
'use client';

import React, { useEffect } from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useParams } from 'next/navigation';

// Validation Schema for Cash Account
const CashAccountSchema = z.object({
    account_name: z.string().min(1, 'Account name is required'),
    opening_balance: z.number().min(0, 'Opening balance must be a positive number').optional(),
    ifsc_code: z.string().min(1, 'IFSC code is required'), // Added IFSC code field
    description: z.string().optional(),
});

type CashAccountFormValues = z.infer<typeof CashAccountSchema>;

const CashAccountForm = ({ accountData, accountType, mode = 'add' }: { accountData?: CashAccountFormValues; accountType: string; mode?: 'add' | 'edit' }) => {
    const router = useRouter();
    const params = useParams();
    const isEditMode = !!params.id;

    const form = useForm<CashAccountFormValues>({
        resolver: zodResolver(CashAccountSchema),
        defaultValues: accountData || { account_name: '', opening_balance: 0, ifsc_code: '', description: '' },
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

    const onSubmit = async (data: CashAccountFormValues) => {
        data.opening_balance = Number(data.opening_balance);

        const method = isEditMode ? 'PUT' : 'POST';
        const url = isEditMode ? `/api/accounts/${params.id}` : '/api/accounts';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, account_type: accountType }),
        });

        if (response.ok) {
            router.push('/accounts');
        } else {
            console.error('Error saving account:', response.statusText);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
            <FormProvider {...form}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <h2 className="text-2xl font-semibold text-[#0179FE]">
                            {isEditMode ? 'Edit Cash Account' : 'Create Bank Account'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField name="account_name" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-semibold">Account Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter account name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField name="opening_balance" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-semibold">Opening Balance</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" placeholder="Enter opening balance" onChange={(e) => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField name="ifsc_code" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-semibold">IFSC Code</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter IFSC code" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField name="description" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-semibold">Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Enter description" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <div className="flex gap-x-4 justify-start">
                            <Button type="submit" className="bg-[#0179FE] text-white">Submit</Button>
                            <Button type="button" onClick={() => router.push('/accounts')} className="bg-[#F9FAFB] text-gray-700">Cancel</Button>
                        </div>
                    </form>
                </Form>
            </FormProvider>
        </div>
    );
};

export default CashAccountForm;
