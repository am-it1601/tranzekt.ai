'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { UserRoundPen } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

// Define Account type
interface Account {
    id: number;
    account_type: string;
    account_name: string;
    opening_balance: number;
    description: string;
}

const AccountsTable = () => {
    const router = useRouter();
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const recordsPerPage = 10; // Show 10 records per page

    // Fetch accounts data
    useEffect(() => {
        const fetchAccounts = async () => {
            setIsLoading(true); // Set loading state to true
            try {
                const response = await fetch('/api/accounts'); // Fetch data from API
                const data = await response.json();
                setAccounts(data);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            } finally {
                setIsLoading(false); // Set loading state to false
            }
        };
        fetchAccounts();
    }, []);

    // Calculate indexes for slicing data
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = accounts.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    );

    // Calculate total pages
    const totalPages = Math.ceil(accounts.length / recordsPerPage);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="">
            <Table className="border rounded-lg shadow-lg overflow-hidden max-w-7xl mx-auto">
                <TableHeader className="bg-[#0179FE] rounded-t-3xl text-white">
                    <TableRow className="space-y-1">
                        <TableHead className="pl-5 ">Account Name</TableHead>
                        <TableHead className="pl-5">Account Type</TableHead>
                        <TableHead className="px-2">Opening Balance</TableHead>
                        <TableHead className="px-2">Description</TableHead>
                        <TableHead className="text-center"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                    {isLoading ? (
                        // Render Enhanced Skeleton Rows
                        Array.from({ length: 10 }).map((_, index) => (
                            <TableRow key={index} className="animate-pulse">
                                <TableCell className="py-4 px-4">
                                    <Skeleton className="h-6 w-32 rounded-md bg-gray-200" />
                                </TableCell>
                                <TableCell className="py-4 px-4">
                                    <Skeleton className="h-6 w-24 rounded-md bg-gray-200" />
                                </TableCell>
                                <TableCell className="py-4 px-4">
                                    <Skeleton className="h-6 w-20 rounded-md bg-gray-200" />
                                </TableCell>
                                <TableCell className="py-4 px-4">
                                    <Skeleton className="h-6 w-48 rounded-md bg-gray-200" />
                                </TableCell>
                                <TableCell className="py-4 px-4">
                                    <Skeleton className="h-8 w-16 rounded-md bg-gray-200" />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : currentRecords.length > 0 ? (
                        currentRecords.map((account) => (
                            <TableRow key={account.id}>
                                <TableCell className="text-sm font-semibold">
    <span
        onClick={() => router.push(`/accounts/${account.id}`)}
        className="cursor-pointer hover:underline text-black-1"
    >
        {account.account_name}
    </span>
</TableCell>

                                <TableCell className="min-w-40">
                                    <Badge
                                        className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                                            account.account_type ===
                                            'Bank account'
                                                ? 'border-[#0179FE] border-2 text-[#0179FE]'
                                                : account.account_type ===
                                                    'Cash account'
                                                  ? 'border-[#039855] text-[#039855] border-2'
                                                  : account.account_type ===
                                                      'Credit Card account'
                                                    ? 'border-[#D97706] text-[#D97706] border-2'
                                                    : 'border-gray-500 text-gray-500 border-2'
                                        }`}
                                    >
                                        <span
                                            className={`w-2 h-2 rounded-full ${
                                                account.account_type ===
                                                'Bank account'
                                                    ? 'bg-[#0179FE]'
                                                    : account.account_type ===
                                                        'Cash account'
                                                      ? 'bg-[#039855]'
                                                      : account.account_type ===
                                                          'Credit Card account'
                                                        ? 'bg-[#D97706]'
                                                        : 'bg-gray-500'
                                            }`}
                                        ></span>
                                        <span>{account.account_type}</span>
                                    </Badge>
                                </TableCell>
                                <TableCell>{account.opening_balance}</TableCell>
                                <TableCell>{account.description}</TableCell>
                                <TableCell className="text-center">
                                    <UserRoundPen
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering row click
                                            router.push(
                                                `/accounts/${account.id}?mode=edit`
                                            ); // Edit view
                                        }}
                                        className="bg-[#0179FE] p-1 text-white cursor-pointer rounded-full h-7 w-7"
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                No accounts available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() =>
                                    currentPage > 1 &&
                                    handlePageChange(currentPage - 1)
                                }
                                className={
                                    currentPage === 1
                                        ? 'opacity-50 pointer-events-none'
                                        : ''
                                }
                            />
                        </PaginationItem>

                        {/* Pagination Numbers */}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PaginationItem key={index}>
                                <Button
                                    variant={
                                        currentPage === index + 1
                                            ? 'default'
                                            : 'outline'
                                    }
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Button>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() =>
                                    currentPage < totalPages &&
                                    handlePageChange(currentPage + 1)
                                }
                                className={
                                    currentPage === totalPages
                                        ? 'opacity-50 pointer-events-none'
                                        : ''
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default AccountsTable;
