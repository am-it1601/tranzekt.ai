import { z } from 'zod';

export const AccountFormSchema = z.object({
    account_type: z.string().min(1, 'Account type is required'),
    account_name: z.string().min(1, 'Account name is required'),
    opening_balance: z
        .number()
        .nonnegative('Opening balance must be greater than or equal to 0'),
    description: z.string().optional(),
});
