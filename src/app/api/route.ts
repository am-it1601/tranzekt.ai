// /app/api/saveAccount/route.ts

import fs from 'fs';
import path from 'path';
import accountData from '@/data/data.json'
const accountsFilePath = path.join(process.cwd(), 'src/data', 'data.json');

// POST method
export async function POST(req: Request) {
    try {
        const newAccount = await req.json();

    //     let accounts:accountData[] = [];
    // let newId = 1; // Default id for the first entry

    // Add the new account with the generated id
   

        if (fs.existsSync(accountsFilePath)) {
            // Read the existing accounts data from the JSON file
            const data = JSON.parse(fs.readFileSync(accountsFilePath, 'utf8'));

      // Find the last account and increment the id
      const lastAccount = data[data.length - 1];
      const newId = lastAccount ? lastAccount.id + 1 : 1
            // Add the new account data to the existing accounts array
            const accountWithId = { ...newAccount, id: newId };
            data.push(accountWithId);

            // Write the updated accounts data to the JSON file
            fs.writeFileSync(accountsFilePath, JSON.stringify(data, null, 2));

            return new Response(
                JSON.stringify({ message: 'Account saved successfully!' }),
                { status: 200 }
            );
        } else {
            const accounts = [newAccount];
            fs.writeFileSync(
                accountsFilePath,
                JSON.stringify(accounts, null, 2)
            );

            return new Response(
                JSON.stringify({ message: 'Account saved successfully!' }),
                { status: 200 }
            );
        }
    } catch (error) {
        console.error('Error saving account:', error);
        return new Response(
            JSON.stringify({
                message: 'An error occurred while saving the account.',
            }),
            { status: 500 }
        );
    }
}

// Optional: You can also handle other methods like GET, PUT, DELETE, etc.
export async function GET(req: Request) {
    try {
        const data = fs.existsSync(accountsFilePath)
            ? JSON.parse(fs.readFileSync(accountsFilePath, 'utf8'))
            : [];

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error('Error reading accounts:', error);
        return new Response(
            JSON.stringify({ message: 'Error reading accounts data.' }),
            { status: 500 }
        );
    }
}
