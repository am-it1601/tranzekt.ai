import { getAccountById } from '@/lib/accounts'; // Import function from lib folder
import AccountForm from '@/components/fearures/accounts/AccountForm';
import AccountDetails from '@/components/fearures/accounts/AccountDetails';

// Define the expected types for the props
interface AccountPageProps {
    params: {
        id: string; // Ensure 'id' is a string
    };
    searchParams?: {
        mode?: string; // 'mode' is optional and a string
    };
}

// Use the typed props
export default async function AccountPage({ params, searchParams }: AccountPageProps) {
    const { id } = params; // Get the dynamic route parameter
    const mode = searchParams?.mode || 'view'; // Retrieve mode from query params

    // Fetch account data server-side
    let accountData = null;
    try {
        accountData = await getAccountById(id);
    } catch (error) {
        console.error('Failed to fetch account data:', error);
        return <div>Error fetching account data</div>;
    }

    // Render based on the mode
    return (
        <div>
            {mode === 'edit' ? (
                <>
                    <h1 className="text-2xl font-bold p-6 pb-3">Edit Account</h1>
                    <AccountForm accountData={accountData} mode="edit" />
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
