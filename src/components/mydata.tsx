// "use client"; // This makes the component a Client Component

// import React, { useState } from "react";
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectGroup } from '@/components/ui/select';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// type AccountType = "Bank" | "Cash" | "Credit Card" | "Checking";

// interface Account {
//   accountType: AccountType;
//   accountName: string;
//   openingBalance: number;
//   description: string;
// }

// const AccountForm = () => {
//   const [accounts, setAccounts] = useState<Account[]>([]);
//   const [accountType, setAccountType] = useState<AccountType>("Bank");
//   const [accountName, setAccountName] = useState("");
//   const [openingBalance, setOpeningBalance] = useState("");
//   const [description, setDescription] = useState("");

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate input
//     if (!accountName || !openingBalance || isNaN(Number(openingBalance))) {
//       alert("Please fill in all fields correctly");
//       return;
//     }

//     const newAccount: Account = {
//       accountType,
//       accountName,
//       openingBalance: parseFloat(openingBalance),
//       description,
//     };

//     setAccounts((prevAccounts) => [...prevAccounts, newAccount]);

//     // Reset form
//     setAccountName("");
//     setOpeningBalance("");
//     setDescription("");
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h1 className="text-2xl font-semibold mb-4">Add New Account</h1>
      
//       {/* Account Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//           <label className="block text-sm font-medium">Account Type</label>
//           <Select value={accountType} onValueChange={(value) => setAccountType(value as AccountType)}>
//             <SelectTrigger className="w-full p-2 border rounded-md">
//               <span>{accountType}</span>
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Choose Account Type</SelectLabel>
//                 <SelectItem value="Bank">Bank</SelectItem>
//                 <SelectItem value="Cash">Cash</SelectItem>
//                 <SelectItem value="Credit Card">Credit Card</SelectItem>
//                 <SelectItem value="Checking">Checking</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Account Name</label>
//           <input
//             type="text"
//             value={accountName}
//             onChange={(e) => setAccountName(e.target.value)}
//             placeholder="Enter account name"
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Opening Balance</label>
//           <input
//             type="number"
//             value={openingBalance}
//             onChange={(e) => setOpeningBalance(e.target.value)}
//             placeholder="Enter opening balance"
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Enter account description"
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
//         >
//           Add Account
//         </button>
//       </form>

//       {/* Accounts Table
//       <h2 className="text-xl font-semibold mt-8">Accounts List</h2>
//       <Table className="mt-4 w-full">
//         <TableHeader>
//           <TableRow>
//             <TableHead>Account Type</TableHead>
//             <TableHead>Account Name</TableHead>
//             <TableHead>Opening Balance</TableHead>
//             <TableHead>Description</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {accounts.map((account, index) => (
//             <TableRow key={index}>
//               <TableCell>{account.accountType}</TableCell>
//               <TableCell>{account.accountName}</TableCell>
//               <TableCell>{account.openingBalance}</TableCell>
//               <TableCell>{account.description}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table> */}
//     </div>
//   );
// };

// export default AccountForm;



// "use client"; // This makes the component a Client Component
// import HeaderBox from '@/components/HeaderBox';

// import React, { useState } from "react";
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectGroup } from '@/components/ui/select';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// type AccountType = "Bank account" | "Cash account" | "Credit Card account" | "Checking account";

// interface Account {
//   accountType: AccountType;
//   accountName: string;
//   openingBalance: number;
//   description: string;
// }

// const AccountForm = () => {
//   const [accounts, setAccounts] = useState<Account[]>([]);
//   const [accountType, setAccountType] = useState<AccountType>("Bank account");
//   const [accountName, setAccountName] = useState("");
//   const [openingBalance, setOpeningBalance] = useState("");
//   const [description, setDescription] = useState("");

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate input
//     if (!accountName || !openingBalance || isNaN(Number(openingBalance))) {
//       alert("Please fill in all fields correctly");
//       return;
//     }

//     const newAccount: Account = {
//       accountType,
//       accountName,
//       openingBalance: parseFloat(openingBalance),
//       description,
//     };

//     setAccounts((prevAccounts) => [...prevAccounts, newAccount]);

//     // Reset form
//     setAccountName("");
//     setOpeningBalance("");
//     setDescription("");
//   };

//   return (
    
//     <div className="w-full mx-auto p-6">
//       <HeaderBox title="Add New Account" subtext="" />
      
//       {/* Account Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 flex  w-2/6  flex-col justify-center pt-0 ">
//       <div className="w-2/4 py-4">
//           <label className="block py-2 text-sm font-medium">Account Type</label>
//           <Select value={accountType} onValueChange={(value) => setAccountType(value as AccountType)}>
//             <SelectTrigger className="w-full p-2 border rounded-md">
//               <span>{accountType}</span>
//             </SelectTrigger>
//             <SelectContent className="focus:ring-blue-500 bg-white focus:border-blue-500 focus:outline-none">
//               <SelectGroup>
//                 <SelectLabel>Choose Account Type</SelectLabel>
//                 <SelectItem value="Bank account">Bank Account</SelectItem>
//                 <SelectItem value="Cash account">Cash Account</SelectItem>
//                 <SelectItem value="Credit Card account">Credit Card Account</SelectItem>
//                 <SelectItem value="Checking account">Checking Account</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Account Name</label>
//           <input
//             type="text"
//             value={accountName}
//             onChange={(e) => setAccountName(e.target.value)}
//             placeholder="Enter account name"
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Opening Balance</label>
//           <input
//             type="number"
//             value={openingBalance}
//             onChange={(e) => setOpeningBalance(e.target.value)}
//             placeholder="Enter opening balance"
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Enter account description"
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
//         >
//           Add Account
//         </button>
//       </form>

//       Accounts Table
//       <h2 className="text-xl font-semibold mt-8">Accounts List</h2>
//       <Table className="mt-4 w-full">
//         <TableHeader>
//           <TableRow>
//             <TableHead>Account Type</TableHead>
//             <TableHead>Account Name</TableHead>
//             <TableHead>Opening Balance</TableHead>
//             <TableHead>Description</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {accounts.map((account, index) => (
//             <TableRow key={index}>
//               <TableCell>{account.accountType}</TableCell>
//               <TableCell>{account.accountName}</TableCell>
//               <TableCell>{account.openingBalance}</TableCell>
//               <TableCell>{account.description}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AccountForm;





// // code 3rd updated 







// // 2nd code updated 