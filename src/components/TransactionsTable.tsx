import _ from 'lodash';
import moment from 'moment';
import React from 'react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { transactionCategoryStyles } from '../constants';
import { cn, formatAmount, getTransactionStatus } from '../lib/utils';

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
    const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
        transactionCategoryStyles[
            category as keyof typeof transactionCategoryStyles
        ] || transactionCategoryStyles.default;

    return (
        <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
            <div className={cn('size-2 rounded-full', backgroundColor)} />
            <p className={cn('text-[12px] font-medium', textColor)}>
                {category}
            </p>
        </div>
    );
};

const TransactionsTable: React.FC<TransactionTableProps> = ({
    transactions = [],
}) => {
    return (
        <Table>
            <TableCaption>A list of your recent transactions.</TableCaption>
            <TableHeader className="bg-[#f9fafb]">
                <TableRow>
                    <TableHead className="px-2">Date</TableHead>
                    <TableHead className="px-2">Description</TableHead>
                    <TableHead className="px-2">Status</TableHead>
                    <TableHead className="px-2 max-md:hidden">
                        Channel
                    </TableHead>
                    <TableHead className="px-2 max-md:hidden">
                        Category
                    </TableHead>
                    <TableHead className="px-2 text-right" align="right">
                        Amount
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((singLeTransaction) => {
                    const transactionStatus = getTransactionStatus(
                        new Date(singLeTransaction.date)
                    );
                    const formattedAmount = formatAmount(
                        singLeTransaction.amount
                    );

                    return (
                        <TableRow
                            key={singLeTransaction.$id}
                            className={`${formattedAmount[0] === '-' ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]'} !over:bg-none !border-b-DEFAULT`}
                        >
                            <TableCell className="pl-2 pr-10 min-w-40">
                                <div>
                                    <h1>
                                        {moment(singLeTransaction.date).format(
                                            'YYYY, MMM DD'
                                        )}
                                    </h1>
                                </div>
                            </TableCell>
                            <TableCell className="max-w-[250px] pl-2 pr-10">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-14 truncate font-semibold text-[#344054]">
                                        {singLeTransaction.name}
                                    </h1>
                                </div>
                            </TableCell>
                            <TableCell className="pl-2 pr-10">
                                <CategoryBadge category={transactionStatus} />
                            </TableCell>
                            <TableCell className="pl-2 pr-10 max-md:hidden">
                                <div>
                                    <h1>
                                        {_.capitalize(
                                            singLeTransaction.paymentChannel
                                        )}
                                    </h1>
                                </div>
                            </TableCell>
                            <TableCell className="pl-2 pr-10 max-md:hidden">
                                <CategoryBadge
                                    category={singLeTransaction.category}
                                />
                            </TableCell>
                            <TableCell
                                className={`pl-10 pr-2 font-semibold ${
                                    formattedAmount[0] === '-'
                                        ? 'text-[#f04438]'
                                        : 'text-[#039855]'
                                }`}
                                align="right"
                            >
                                {formattedAmount}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default TransactionsTable;
