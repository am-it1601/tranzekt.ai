'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import accountData from '@/data/data.json';

// import { AreaChartStaked } from '@/components/AreaChartStaked';
// import { BarChartDouble } from '@/components/BarChartDouble';
// import AccountsTable from '@/components/AccountsTable';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
const page = () => {
    const router = useRouter();
    const navigateToAdd = () => {
        router.push('/accounts/Add');
    };

    return (
        <>
            {' '}
            {/* Form  */}
            <div className="p-4 mt-3 text-right pr-6">
                <Button
                    onClick={navigateToAdd}
                    className="bg-[#0179FE] font-medium text-white"
                >
                    <Plus /> Add Account
                </Button>
            </div>
            <div className="h-auto px-6 w-full">
                <h2 className="text-xl font-semibold mt-8">Accounts List</h2>
                <Table className="mt-4 w-full">
                    <TableHeader className="bg-[#0179FE] text-white">
                        <TableRow>
                            <TableHead>Account Type</TableHead>
                            <TableHead>Account Name</TableHead>
                            <TableHead>Opening Balance</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {accountData.map((account, index) => (
                            <TableRow key={index}>
                                <TableCell>{account.account_type}</TableCell>
                                <TableCell>{account.account_name}</TableCell>
                                <TableCell>{account.opening_balance}</TableCell>
                                <TableCell>{account.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* <AreaChartStaked />
                <BarChartDouble /> */}
                {/* <AccountsTable />  */}
            </div>
        </>
    );
};

export default page;
