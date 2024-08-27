'use server';

import _ from 'lodash';
import moment from 'moment';
import { cookies } from 'next/headers';
import { ID, Query } from 'node-appwrite';

import { createAdminClient, createSessionClient } from '../appwrite';
import { extractCustomerIdFromUrl, parseStringify } from '../utils';
import { createDwollaCustomer } from './dwolla.actions';

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

export const signIn = async (data: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const { email, password } = data;

        const response = await account.createEmailPasswordSession(
            email,
            password
        );
        cookies().set('user-auth-session', response.secret, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });

        return parseStringify(response);
        //
    } catch (error) {
        console.error('AUTH_SIGNIN_ERROR :', error);
    }
};

export const register = async ({ password, ...userData }: SignUpParams) => {
    let newUserAccount;
    try {
        //
        const { account, database } = await createAdminClient();

        const { email, firstName, lastName } = userData;
        const name = _.capitalize(firstName)
            .concat(' ')
            .concat(_.capitalize(lastName));

        newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
        );

        if (!newUserAccount) throw new Error('Error creating user');

        let dwollaCustomer = {
            ...userData,
            address1: userData.address,
            dateOfBirth: moment(userData.dateOfBirth).format('YYYY-MM-DD'),
            type: 'personal',
        };
        const dwollaCustomerUrl = await createDwollaCustomer(dwollaCustomer);

        if (!dwollaCustomerUrl)
            throw new Error('Error creating dwolla customer');

        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

        const newUser = await database.createDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,

            ID.unique(),
            {
                ...userData,
                userId: newUserAccount.$id,
                dwollaCustomerId,
                dwollaCustomerUrl,
            }
        );

        const session = await account.createEmailPasswordSession(
            email,
            password
        );

        cookies().set('user-auth-session', session.secret, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });

        return parseStringify(newUser);
    } catch (error) {
        console.error(error);
    }
};

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
        const { database } = await createAdminClient();

        const user = await database.listDocuments(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            [Query.equal('userId', [userId])]
        );

        return parseStringify(user.documents[0]);
    } catch (error) {
        console.error('ERROR GetUserInfo', error);
    }
};

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        return parseStringify(user);
    } catch (error) {
        console.error('AUTH_ERROR : ', error);
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();

        cookies().delete('user-auth-session');

        return await account.deleteSession('current');
    } catch (error) {
        return null;
    }
};
