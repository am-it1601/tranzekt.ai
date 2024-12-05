"use client"
import React from 'react';
import { useRouter } from 'next/navigation';


import AccountForm from '@/components/AccountForm';
import { AreaChartStaked } from '@/components/AreaChartStaked';
import { BarChartDouble } from '@/components/BarChartDouble';
import AccountsTable from '@/components/AccountsTable';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
const page = () => {
  const router = useRouter();
  const navigateToAdd = () => {
    router.push('/accounts/Add');
  };

    return (
        
           <> {/* Form  */}
            
            <div className='p-4 text-right pr-6'>
            <Button onClick={navigateToAdd} className='bg-[#0179FE] font-medium text-white'>
            <Plus />  Add Account
            </Button>
           </div>
            <div className="h-auto px-6 w-full">
                {/* <AreaChartStaked />
                <BarChartDouble /> */}
                <AccountsTable />
            </div>
            </>
        
    );
};

export default page;
