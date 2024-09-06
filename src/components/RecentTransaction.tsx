import Link from 'next/link';
import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import BankInfo from './BankInfo';
import { BankTabItem } from './BankTabItem';
import { Pagination } from './Pagination';
import TransactionsTable from './TransactionsTable';

const RecentTransaction: React.FC<RecentTransactionsProps> = ({
    accounts,
    transactions,
    appwriteItemId,
    page = 1,
}) => {
    const rowsPerPage = 10;
    const totalPages = Math.ceil(transactions.length / rowsPerPage);
    const indexOfLastTransaction = page * rowsPerPage;
    const firstTransactionIndex = indexOfLastTransaction - rowsPerPage;
    const currentTransactions = transactions.slice(
        firstTransactionIndex,
        indexOfLastTransaction
    );

    return (
        <section className="recent-transactions">
            <header className="flex items-center justify-between">
                <h2 className="recent-transactions-lable">
                    Recent Transactions
                </h2>
                <Link
                    href={`/transaction-history/?id=${appwriteItemId}`}
                    className="view-all-btn"
                >
                    View All
                </Link>
            </header>
            <Tabs defaultValue={appwriteItemId} className="w-full">
                <TabsList className="recent-transactions-tablist">
                    {accounts.map((account) => (
                        <TabsTrigger
                            value={account.appwriteItemId}
                            key={account.id}
                        >
                            <BankTabItem
                                key={account.id}
                                account={account}
                                appwriteItemId={appwriteItemId}
                            />
                        </TabsTrigger>
                    ))}
                </TabsList>
                {accounts.map((account) => (
                    <TabsContent
                        value={account.appwriteItemId}
                        key={account.id}
                        className="space-y-4"
                    >
                        <BankInfo
                            account={account}
                            appwriteItemId={appwriteItemId}
                            type="full"
                        />
                        <TransactionsTable transactions={currentTransactions} />
                        <Pagination totalPages={totalPages} page={page} />
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    );
};

export default RecentTransaction;
