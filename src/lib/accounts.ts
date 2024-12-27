"use server"
import fs from 'fs';
import path from 'path';

// Path to data file
const filePath = path.join(process.cwd(), 'src/data/data.json');

// Read data from JSON file
const readData = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

// Write data to JSON file
const writeData = (data: any) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Fetch all accounts
export const getAccounts = async () => {
    try {

        const data =  readData();
        
        return data;
    } catch (error) {
        console.error('Failed to fetch accounts:', error);
        throw new Error('Failed to fetch accounts');
    }
};

// Fetch a single account by ID
export async function getAccountById(id: string | number) {
    const accounts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id; // Convert if needed
    return accounts.find((acc: any) => acc.id === numericId);
}



// export const getAccountById = async (id: number) => {
//     try {
//         const data = readData();
//         return data.find((account: any) => account.id === id);
//     } catch (error) {
//         console.error('Failed to fetch account:', error);
//         throw new Error('Failed to fetch account');
//     }
// };

// Add a new account
export const addAccount = async (account: any) => {
    try {
        const data = readData();
        const newAccount = { id: Date.now(), ...account };
        data.push(newAccount);
        writeData(data);
        return newAccount;
    } catch (error) {
        console.error('Failed to add account:', error);
        throw new Error('Failed to add account');
    }
};
