import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import { Landmark } from 'lucide-react';
  import { CreditCard } from 'lucide-react';
  import { HandCoins } from 'lucide-react';
  import { UserRoundCheck } from 'lucide-react';
  

const AccountsTable = () => {
  return (
    <div className='py-4 '><Table>
    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
    <TableHeader className='bg-[#0179FE] text-white'>
      <TableRow>
        <TableHead className="w-[200px]">Account Details</TableHead>
        <TableHead></TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium text-[#017EF9] flex items-center gap-2"> <Landmark />Bank Account</TableCell>
    
        <TableCell className='text-[#FF0000] text-center'>345 Transactions</TableCell>
        <TableCell className="text-right">$250.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium text-[#017EF9] flex items-center gap-2 "><HandCoins />Cash Account</TableCell>
    
        <TableCell className='text-[#FF0000] text-center'>231 Transactions</TableCell>
        <TableCell className="text-right">$234.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium text-[#017EF9] flex items-center gap-2"> <CreditCard />Credit Card Account</TableCell>
    
        <TableCell className='text-[#FF0000] text-center'>311 Transactions</TableCell>
        <TableCell className="text-right">$345.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium text-[#017EF9] flex items-center gap-2">  <UserRoundCheck />Checking Account</TableCell>
    
        <TableCell className='text-[#FF0000] text-center'>256 Transactions</TableCell>
        <TableCell className="text-right">$545.00</TableCell>
      </TableRow>
    </TableBody>
  </Table></div>
  )
}

export default AccountsTable