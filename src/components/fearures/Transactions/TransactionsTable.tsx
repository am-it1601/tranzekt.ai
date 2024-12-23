import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

// Define Transaction interface
interface Transaction {
    id: number,
    date: string;
    description: string;
    withdrawal: number;
    deposit: number;
    balance: number;
}

const TransactionsTable = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]); // State to store transactions
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    // Get account ID from URL
    const searchParams = useParams();
    const { id } = searchParams; // e.g., /transactions?id=1 -> "1"

    // Fetch data from API
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // Fetch data
                const response = await fetch(`/api/accounts/${id}`); // Adjust API path as needed
                if (!response.ok) throw new Error('Failed to load data'); // Handle HTTP errors
                
                const data = await response.json(); // Parse JSON
               
                setTransactions(data.transactions || []); // Set transactions
            } catch (err: any) {
                setError(err.message); // Store error
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchTransactions();
    }, []); // Re-run if accountId changes

    return (
        <div className="border rounded-lg shadow-md overflow-x-auto mt-6">
            <Table className="border rounded-lg shadow-lg overflow-hidden max-w-7xl mx-auto">
                {/* Table Header */}
                <TableHeader className="bg-[#0179FE] rounded-t-3xl text-white">
                    <TableRow className="space-y-1">
                        <TableHead className="text-left">Date</TableHead>
                        <TableHead className="text-left">Description</TableHead>
                        <TableHead className="text-left">Amount Withdrawal</TableHead>
                        <TableHead className="text-left">Amount Deposit</TableHead>
                        <TableHead className="text-center">Amount</TableHead>
                    </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className='bg-white'>
                    {loading ? (
                        // Skeleton Loader
                        Array.from({ length: 10 }).map((_, index) => (
                            <TableRow key={index} className="animate-pulse">
                                <TableCell>
                                    <Skeleton className="h-6 w-24 rounded-md bg-gray-200" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-6 w-48 rounded-md bg-gray-200" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-6 w-16 rounded-md bg-gray-200" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-6 w-16 rounded-md bg-gray-200" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-6 w-16 rounded-md bg-gray-200" />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : error ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-red-500 py-4">
                                Error: {error}
                            </TableCell>
                        </TableRow>
                    ) : transactions.length > 0 ? (
                        transactions.map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell className="text-red-500">
                                    {transaction.withdrawal.toFixed(2)}
                                </TableCell>
                                <TableCell className="text-green-500">
                                    {transaction.deposit.toFixed(2)}
                                </TableCell>
                                <TableCell className='text-center'>{transaction.balance.toFixed(2)}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-4">
                                No transactions found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default TransactionsTable;
