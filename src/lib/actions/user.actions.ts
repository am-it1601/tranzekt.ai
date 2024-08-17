'use server';

import _ from 'lodash';
import { cookies } from 'next/headers';
import { ID } from 'node-appwrite';

import { createAdminClient, createSessionClient } from '../appwrite';
import { parseStringify } from '../utils';

export const signIn = async (data: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const { email, password } = data;

        const response = await account.createEmailPasswordSession(
            email,
            password
        );
        return parseStringify(response);
        //
    } catch (error) {
        console.error(error);
    }
};

export const register = async (userData: SignUpParams) => {
    try {
        //
        const { account } = await createAdminClient();

        const { email, password, firstName, lastName } = userData;
        const name = _.capitalize(firstName)
            .concat(' ')
            .concat(_.capitalize(lastName));
        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
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

        return parseStringify(newUserAccount);
    } catch (error) {
        console.error(error);
    }
};

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        return parseStringify(await account.get());
    } catch (error) {
        return null;
    }
}
