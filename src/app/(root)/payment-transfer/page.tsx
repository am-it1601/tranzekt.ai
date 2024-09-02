import React from 'react';

import FundTransferForm from '../../../components/FundTransferForm';
import HeaderBox from '../../../components/HeaderBox';
import { getAccounts } from '../../../lib/actions/bank.actions';
import { getLoggedInUser } from '../../../lib/actions/user.actions';

const PaymentTransfer = async () => {
    const loggedIn = await getLoggedInUser();
    const accounts =
        loggedIn &&
        (await getAccounts({
            userId: loggedIn.$id,
        }));

    if (!accounts) return;

    const accountsData = accounts?.data;

    return (
        <section className="payment-transfer">
            <HeaderBox
                title="Payment Transfer"
                subtext="Please provide any specific details or notes related to the payment transfer"
            />

            <section className="size-full pt-5">
                <FundTransferForm accounts={accountsData} />
            </section>
        </section>
    );
};

export default PaymentTransfer;
