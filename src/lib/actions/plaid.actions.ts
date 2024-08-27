'use server';

import type {
    CountryCode,
    LinkTokenCreateRequest,
    ProcessorTokenCreateRequest,
    ProcessorTokenCreateRequestProcessorEnum,
    Products,
} from 'plaid';
import { revalidatePath } from 'next/cache';

import { plaidClient } from '@/lib/plaid';

import { encryptId, parseStringify } from '../utils';
import { createBankAccount } from './bank.actions';
import { addFundingSource } from './dwolla.actions';

export const createLinkToken = async (user: User) => {
    try {
        const tokenParams: LinkTokenCreateRequest = {
            user: {
                client_user_id: user.$id,
            },
            client_name: user.name,
            products: ['auth'] as Products[],
            country_codes: ['US', 'IN'] as CountryCode[],
            language: 'en',
        };

        const response = await plaidClient.linkTokenCreate(tokenParams);

        console.log('Create link token', response);

        return parseStringify({
            linkToken: response.data.link_token,
        });
    } catch (error) {
        console.error(error);
    }
};

export const exchangePublicToken = async ({
    publicToken,
    user,
}: {
    publicToken: string;
    user: User;
}) => {
    console.log(publicToken, user);
    try {
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken,
        });

        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        // Get account information from Plaid using the access token
        const accountsResponse = await plaidClient.accountsGet({
            access_token: accessToken,
        });

        const accountData = accountsResponse.data.accounts[0];

        // Create a processor token for Dwolla using the access token and account ID
        const request: ProcessorTokenCreateRequest = {
            access_token: accessToken,
            account_id: accountData.account_id,
            processor: 'dwolla' as ProcessorTokenCreateRequestProcessorEnum,
        };

        const processorTokenResponse =
            await plaidClient.processorTokenCreate(request);
        const processorToken = processorTokenResponse.data.processor_token;

        const fundingSourceUrl = await addFundingSource({
            dwollaCustomerId: user.dwollaCustomerId,
            processorToken,
            bankName: accountData.name,
        });

        // If the funding source URL is not created, throw an error
        if (!fundingSourceUrl) throw Error;

        await createBankAccount({
            userId: user.$id,
            bankId: itemId,
            accountId: accountData.account_id,
            accessToken,
            fundingSourceUrl,
            sharableId: encryptId(accountData.account_id),
        });
        revalidatePath('/');

        // Return a success message
        return parseStringify({
            publicTokenExchange: 'complete',
        });
    } catch (error) {
        console.error(error);
    }
};
