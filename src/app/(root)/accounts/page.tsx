import React from 'react';



import AccountForm from '@/components/AccountForm';
import { AreaChartStaked } from '@/components/AreaChartStaked';
import { BarChartDouble } from '@/components/BarChartDouble';
import AccountsTable from '@/components/AccountsTable';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
const page = () => {
    return (
        
           <>

           
           

            {/* Form  */}
            <div className="px-8 py-6">
                <AccountForm />
            </div>
            <div className='p-4 text-right pr-6'>
            <Button className='bg-[#0179FE] font-medium text-white'>
            <Plus />  Add Account
            </Button>
           </div>
            <div className="h-auto px-6 w-full">
                <AreaChartStaked />
                <BarChartDouble />
                <AccountsTable />
            </div>
            </>
        
    );
};

export default page;
