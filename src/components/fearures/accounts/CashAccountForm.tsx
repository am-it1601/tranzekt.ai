// CashAccountForm.tsx
'use client';

import React from 'react';
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

// Validation Schema for Cash Account
const CashAccountSchema = z.object({
    accountName: z.string().min(1, 'Account name is required'),
    openingBalance: z
        .number()
        .min(0, 'Opening balance must be a positive number')
        .optional(),
    description: z.string().optional(),
});

// Type definition
type CashAccountFormValues = z.infer<typeof CashAccountSchema>;

const CashAccountForm = ({
    accountData,
    // accountType,
    mode = 'add',
}: {
    accountData?: CashAccountFormValues;
    accountType: string;
    mode?: 'add' | 'edit';
}) => {
    const router = useRouter();
    const params = useParams();
    const isEditMode = mode === 'edit';
    const accountId = params.id as string;

    // Form setup
    const form = useForm<CashAccountFormValues>({
        resolver: zodResolver(CashAccountSchema),
        defaultValues: accountData || {
            accountName: '',
            openingBalance: 0,
            description: '',
        },
    });

    // Form submission
    const onSubmit = async (data: CashAccountFormValues) => {
        data.openingBalance = Number(data.openingBalance);

        try {
            let response;
            if (isEditMode) {
                response = await updateAccount(accountId, data);
            } else {
                response = await createAccount('CASH', data);
            }

            if (response) {
                router.refresh();
                router.push('/accounts');
            }
        } catch (error) {
            console.error('Error saving account:', error);
        }
    };

    return (
        <div className="max-w-4xl bg-white rounded-lg shadow-sm">
            <FormProvider {...form}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 py-4"
                    >
                        <h2 className="text-xl font-semibold text-gray-700">
                            {isEditMode
                                ? 'Edit Cash Account'
                                : 'Enter Cash Account Details'}
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

export default CashAccountForm;
