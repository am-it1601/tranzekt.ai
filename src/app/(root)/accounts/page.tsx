
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



const page = () => {
 
    return (
        <div>
            <div className="transactions">
                <HeaderBox title="Add Account" subtext="" />
            </div>

            {/* Select account type  */}

            <div className="px-8 py-8">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Account Type" />
                    </SelectTrigger>
                    <SelectContent className="focus:ring-blue-500 focus:border-blue-500 focus:outline-none">
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
        </div>
    );
};

export default page;
