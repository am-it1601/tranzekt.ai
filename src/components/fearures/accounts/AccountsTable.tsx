'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';

// Define Account type
interface Account {
    id: number;
    account_type: string;
    account_name: string;
    opening_balance: number;
    description: string;
}

// Define Props for Table
interface AccountsTableProps {
    accounts: Account[];
}

const AccountsTable: React.FC<AccountsTableProps> = ({ accounts }) => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const recordsPerPage = 10; // Show 10 records per page

    // Calculate pagination
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = accounts.slice(indexOfFirstRecord, indexOfLastRecord);
    console.log("currentRecords",currentRecords)
    const totalPages = Math.ceil(accounts.length / recordsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="">
            <Table className="border rounded-lg shadow-lg overflow-hidden max-w-7xl mx-auto">
                <TableHeader className="bg-[#0179FE] rounded-t-3xl text-white">
                    <TableRow>
                        <TableHead className="pl-5">Account Name</TableHead>
                        <TableHead className="pl-5">Account Type</TableHead>
                        <TableHead className="px-2">Opening Balance</TableHead>
                        <TableHead className="px-2">Description</TableHead>
                        <TableHead className="text-center"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                    {currentRecords.length > 0 ? (
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
                                <TableCell>
                                    <Badge
                                        className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                                            account.account_type === 'Bank account'
                                                ? 'border-[#0179FE] text-[#0179FE] border-2'
                                                : account.account_type === 'Cash account'
                                                ? 'border-[#039855] text-[#039855] border-2'
                                                : 'border-gray-500 text-gray-500 border-2'
                                        }`}
                                    >
                                        <span>{account.account_type}</span>
                                    </Badge>
                                </TableCell>
                                <TableCell>{account.opening_balance}</TableCell>
                                <TableCell>{account.description}</TableCell>
                                <TableCell className="text-center">
                                    <UserRoundPen
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(`/accounts/${account.id}?mode=edit`);
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
                                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                className={
                                    currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
                                }
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PaginationItem key={index}>
                                <Button
                                    variant={
                                        currentPage === index + 1 ? 'default' : 'outline'
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
