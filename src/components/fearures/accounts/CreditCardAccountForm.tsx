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

// Validation Schema for Credit Card Account
const CreditCardAccountSchema = z.object({
    account_name: z.string().min(1, 'Account name is required'),
    credit_limit: z.number().min(0, 'Credit limit must be a positive number').optional(),
    description: z.string().optional(),
});

type CreditCardAccountFormValues = z.infer<typeof CreditCardAccountSchema>;

const CreditCardAccountForm = ({ accountData, accountType, mode = 'add' }: { accountData?: CreditCardAccountFormValues; accountType: string; mode?: 'add' | 'edit' }) => {
    const router = useRouter();
    const params = useParams();
    const isEditMode = !!params.id;

    const form = useForm<CreditCardAccountFormValues>({
        resolver: zodResolver(CreditCardAccountSchema),
        defaultValues: accountData || { account_name: '', credit_limit: 0, description: '' },
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

    const onSubmit = async (data: CreditCardAccountFormValues) => {
        data.credit_limit = Number(data.credit_limit);

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
        <div className=" max-w-4xl bg-white rounded-lg shadow-sm">
            <FormProvider {...form}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <h2 className="text-xl font-semibold text-gray-700">
                            {isEditMode ? 'Edit Credit Card Account' : 'Enter Credit Card Account Details'}
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
                            <FormField name="credit_limit" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-semibold">Credit Limit</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" placeholder="Enter credit limit" onChange={(e) => field.onChange(Number(e.target.value))} />
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

export default CreditCardAccountForm;
