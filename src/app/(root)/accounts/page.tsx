
import React from 'react';

import HeaderBox from '../../../components/HeaderBox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import AccountForm from '@/components/AccountForm';
import {AreaChartStaked} from '@/components/AreaChartStaked'
import { BarChartDouble } from '@/components/BarChartDouble';


const page = () => {
 
    return (
        <div>
            <div className="transactions">
                <HeaderBox title="Add Account" subtext="" />
            </div>

            {/* Select account type  */}

            <div className="px-8 py-6 z-40">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Account Type" />
                    </SelectTrigger>
                    <SelectContent className="focus:ring-blue-500 bg-white focus:border-blue-500 focus:outline-none">
                        <SelectItem  value="BankAccount">
                            Bank Account
                        </SelectItem>
                        <SelectItem value="CashAccount">
                            Cash Account
                        </SelectItem>
                        <SelectItem value="CreditCardAccount">
                            CreditCard Account
                        </SelectItem>
                        <SelectItem value="CheckingAccount">
                            Checking Account
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

             {/* Form  */}
             <div className="px-8 py-6" >
            <AccountForm />
            </div>
            <div className='min-h-screen w-3/5'>
            <AreaChartStaked />
            <BarChartDouble />
            </div>
        </div>
        
    );
};

export default page;
