// import fs from 'fs';
// import path from 'path';

// const accountsFilePath = path.join(process.cwd(), 'src/data/data.json');

// const readData = () => JSON.parse(fs.readFileSync(accountsFilePath, 'utf-8'));
// const writeData = (data: any) => fs.writeFileSync(accountsFilePath, JSON.stringify(data, null, 2));

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//     try {
//         const { id } = params;
//         const accounts = JSON.parse(fs.readFileSync(accountsFilePath, 'utf8'));
//         const account = accounts.find((acc: any) => acc.id === parseInt(id, 10));

//         if (!account) {
//             return new Response(JSON.stringify({ message: 'Account not found.' }), {
//                 status: 404,
//             });
//         }

//         return new Response(JSON.stringify(account), { status: 200 });
//     } catch (error) {
//         console.error('Error fetching account:', error);
//         return new Response(
//             JSON.stringify({ message: 'Error fetching account data.' }),
//             { status: 500 }
//         );
//     }
// }


// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//         const { id } = params;
//     const body = await req.json();

//     if (!id) return new Response('ID is required', { status: 400 });

//     const data = readData();
//     const accountIndex = data.findIndex((item: any) => item.id === parseInt(id));

//     if (accountIndex === -1) return new Response('Account not found', { status: 404 });

//     data[accountIndex] = { ...data[accountIndex], ...body };

//     writeData(data);

//     return new Response(JSON.stringify(data[accountIndex]), { status: 200 });
// }