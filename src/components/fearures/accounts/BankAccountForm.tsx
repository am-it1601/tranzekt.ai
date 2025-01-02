'use client';

import React, { useEffect } from 'react';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useParams } from 'next/navigation';
import { createAccount, updateAccount } from '@/lib/accounts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Validation Schema for Bank Account
const BankAccountSchema = z.object({
    accountName: z.string().min(1, 'Account name is required'),
    openingBalance: z
        .number()
        .min(0, 'Opening balance must be a positive number')
        .optional(),
    description: z.string().optional(),
    accountNumber: z.string(),
    purpose: z.string(),
    institutionName: z.string(),
});

type BankAccountFormValues = z.infer<typeof BankAccountSchema>;

const BankAccountForm = ({
    accountData,
    accountType,
    mode = 'add',
}: {
    accountData?: BankAccountFormValues;
    accountType: string;
    mode?: 'add' | 'edit';
}) => {
    const router = useRouter();
    const params = useParams();
    const isEditMode = mode === 'edit';
    const accountId = params.id as string;

    const form = useForm<BankAccountFormValues>({
        resolver: zodResolver(BankAccountSchema),
        defaultValues: accountData || {
            accountName: '',
            openingBalance: 0,
            description: '',
        },
    });
    useEffect(() => {
        if (isEditMode && accountData) {
            form.reset(accountData);
        }
    }, [isEditMode, accountData, form]);

    const onSubmit = async (data: BankAccountFormValues) => {
        // data.openingBalance = Number(data.openingBalance);

        const method = isEditMode ? 'PUT' : 'POST';
        const addUrl = process.env.NEST_API_URL as string;
        const url = isEditMode ? `/api/accounts/${params.id}` : addUrl;

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, account_type: accountType }),
        });
        const type = 'BANK';
        try {
            let response;
            if (method === 'PUT') {
                response = await updateAccount(accountId, data); // Pass the accountId for the update
                // console.log('accountId', accountId);
                // console.log('Updated account:', response);
            } else {
                response = await createAccount('BANK', data); // Create new account
                // console.log('Created account:', response);
            }

            if (response) {
                router.refresh();
                router.push('/accounts');
            }
        } catch (error) {
            console.error('Error saving account:', error);
        }
        // if (response.ok) {
        //     router.push('/accounts');
        // } else {
        //     console.error('Error saving account:', response.statusText);
        // }
    };

    return (
        <div className=" max-w-4xl  bg-white rounded-lg shadow-sm">
            <FormProvider {...form}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 py-4"
                    >
                        <h2 className="text-xl font-semibold text-gray-700">
                            {isEditMode
                                ? `Edit ${accountType} Details`
                                : `Enter ${accountType} Details`}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField
                                name="accountName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-semibold">
                                            Account Name
                                        </FormLabel>
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
                                name="openingBalance"
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
                                                placeholder="Enter opening balance"
                                                onChange={(e) =>
                                                    field.onChange(
                                                        Number(e.target.value)
                                                    )
                                                }
                                                disabled={isEditMode} // Disable in edit mode
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="accountNumber"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-semibold">
                                            Account Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter account number"
                                                disabled={isEditMode} // Disable in edit mode
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
        name="purpose"
        control={form.control}
        render={({ field }) => (
            <FormItem>
                <FormLabel className="text-gray-700 font-semibold">
                    Purpose
                </FormLabel>
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Purpose" />
                        </SelectTrigger>
                        <SelectContent className='bg-white'>
                            <SelectItem value="SAVING">Saving</SelectItem>
                            <SelectItem value="CHECKING">Checking</SelectItem>
                        </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
                            <FormField
                                name="institutionName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-semibold">
                                            Institution Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter institution name"
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
                                className="bg-[#0179FE] text-white"
                            >
                                Submit
                            </Button>
                            <Button
                                type="button"
                                onClick={() => router.push('/accounts')}
                                className="bg-[#F9FAFB] text-gray-700"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </FormProvider>
        </div>
    );
};

export default BankAccountForm;
