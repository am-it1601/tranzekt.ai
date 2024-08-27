'use server';

import { ID } from 'node-appwrite';

import { createAdminClient } from '../appwrite';
import { parseStringify } from '../utils';

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_PBANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;
export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  sharableId,
}: createBankAccountProps) => {
  try {
    const { database } = await createAdminClient();

    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        sharableId,
      }
    );

    return parseStringify(bankAccount);
  } catch (error) {
    console.error(error);
  }
};
