"use client"
import React, { useEffect, useState } from 'react';
import AccountForm from '@/components/AccountForm';
import { useParams } from 'next/navigation';

const EditAccountPage = () => {
    const params = useParams();
    const  {id}  = params; // Get the dynamic route parameter
    
    const [accountData, setAccountData] = useState();
    // Fetch the account data when the component loads
    useEffect(() => {
        const fetchAccountData = async () => {
            const response = await fetch(`/api/accounts/${id}`); // Your API to get account data by ID
            const data = await response.json();
            setAccountData(data);
        };

        if (id) {
            fetchAccountData();
        }
    }, [id]);

    // Render loading state until data is fetched
    // if (!accountData) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            <h1 className="text-2xl font-bold p-6 pb-3">Edit Account</h1>
            <AccountForm accountData={accountData} mode='edit' />
        </div>
    );
};

export default EditAccountPage;
