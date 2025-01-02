import { getAccount } from '@/lib/accounts';
import AccountDetails from '@/components/fearures/accounts/AccountDetails';
import BankAccountForm from '@/components/fearures/accounts/BankAccountForm';
import CashAccountForm from '@/components/fearures/accounts/CashAccountForm';
import CreditCardAccountForm from '@/components/fearures/accounts/CreditCardAccountForm';

interface AccountPageProps {
    params: {
        id: string;
    };
    searchParams?: {
        mode?: string;
    };
}

export default async function AccountPage({ params, searchParams }: AccountPageProps) {
    const { id } = params;
    const mode = searchParams?.mode || 'view';

    let accountData = null;
    try {
        accountData = await getAccount(id);
    } catch (error) {
        console.error('Failed to fetch account data:', error);
        return <div>Error fetching account data</div>;
    }

    const renderAccountForm = () => {
        switch (accountData?.accountType) {
            case 'BANK':
                return (
                    <BankAccountForm
                        accountData={accountData}
                        accountType="Bank account"
                        mode="edit"
                    />
                );
            case 'CASH':
                return (
                    <CashAccountForm
                        accountData={accountData}
                        accountType="Cash account"
                        mode="edit"
                    />
                );
            case 'Credit Card account':
                return (
                    <CreditCardAccountForm
                        accountData={accountData}
                        accountType="Credit Card account"
                        mode="edit"
                    />
                );
            default:
                return <div>Unsupported account type</div>;
        }
    };

    return (
        <div className='p-6'>
            {mode === 'edit' ? (
                <>
                    <h1 className="text-2xl font-bold pb-3">Edit Account</h1>
                    {renderAccountForm()}
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold bg-gray-25 shadow-sm p-6 flex justify-between items-center">
                        Account Details
                    </h1>
                    <AccountDetails account={accountData} />
                </>
            )}
        </div>
    );
}
