"use client";

import React, { useEffect, useState } from "react";
import AccountForm from "@/components/fearures/accounts/AccountForm";
import AccountDetails from "@/components/fearures/accounts/AccountDetails"; // Import the details component
import { useParams, useSearchParams, useRouter } from "next/navigation";

const AccountPage = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { id } = params; // Get the dynamic route parameter

    const [accountData, setAccountData] = useState();
    const [loading, setLoading] = useState(true);

    // Fetch the account data when the component loads
    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                const response = await fetch(`/api/accounts/${id}`); // Your API to get account data by ID
                const data = await response.json();
                setAccountData(data);
            } catch (error) {
                console.error("Failed to fetch account data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAccountData();
        }
    }, [id]);

    const mode = searchParams.get("mode"); // Retrieve the mode from query params

    // Render loading state until data is fetched
    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // Render based on the mode
    return (
        <div>
            {mode === "edit" ? (
                <>
                    {/* <h1 className="text-2xl font-bold p-6 pb-3">Edit Account</h1> */}
                    <AccountForm accountData={accountData} mode="edit" />
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold  bg-gray-25 shadow-sm p-6  flex justify-between items-center">Account Details</h1>
                    <AccountDetails account={accountData} />
                </>
            )}
        </div>
    );
};

export default AccountPage;
