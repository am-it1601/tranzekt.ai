'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Plus, Edit3 } from 'lucide-react';

// Define Account type
interface Account {
    id: number;
    account_type: string;
    account_name: string;
    opening_balance: number;
    description: string;
}

const Page = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const recordsPerPage = 10; // Show 10 records per page
    const router = useRouter();

    // Fetch accounts data
    useEffect(() => {
        const fetchAccounts = async () => {
            const response = await fetch('/api/accounts'); // Fetch data from API
            const data = await response.json();
            setAccounts(data);
        };
        fetchAccounts();
    }, []);

    const navigateToAdd = () => {
        router.push('/accounts/Add');
    };

    const navigateToEdit = (id: number) => {
        router.push(`/accounts/${id}`);
    };
    

    // Calculate indexes for slicing data
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = accounts.slice(indexOfFirstRecord, indexOfLastRecord);

    // Calculate total pages
    const totalPages = Math.ceil(accounts.length / recordsPerPage);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-6">
            {/* Add Account Button */}
            <div className="text-right pb-6">
                <Button onClick={navigateToAdd} className="bg-[#0179FE] text-white">
                    <Plus className="mr-2" /> Add Account
                </Button>
            </div>

            {/* Accounts Table */}
            <Table>
                <TableHeader className='bg-[#0179FE] text-white'>
                    <TableRow>
                        <TableHead>Account Type</TableHead>
                        <TableHead>Account Name</TableHead>
                        <TableHead>Opening Balance</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentRecords.map((account) => (
                        <TableRow key={account.id}>
                            <TableCell>{account.account_type}</TableCell>
                            <TableCell>{account.account_name}</TableCell>
                            <TableCell>{account.opening_balance}</TableCell>
                            <TableCell>{account.description}</TableCell>
                            <TableCell>
                                <Button
                                    onClick={() => navigateToEdit(account.id)}
                                    className="bg-[#0179FE] text-white"
                                >
                                    <Edit3 className="mr-2" /> update
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* pagination  */}

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

export default Page;
