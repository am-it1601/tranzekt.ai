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

//       {/* Accounts Table  */}
      
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










// 2nd code which fixes opening balance but now select items not working 







// "use client";

// import React, { useState } from "react";
// import HeaderBox from "@/components/HeaderBox";
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectGroup } from "@/components/ui/select";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// // Define account types
// type AccountType = "Bank account" | "Cash account" | "Credit Card account" | "Checking account";

// // Define schema using zod
// const AccountTypeSchema = z.enum(["Bank account", "Cash account", "Credit Card account", "Checking account"]);
// const AccountSchema = z.object({
//   accountType: AccountTypeSchema,
//   accountName: z.string().min(1, "Account name is required"),
//   openingBalance: z.string().min(1, "Opening balance is required"),
//   description: z.string().optional(),
// });

// // Define the interface for an Account
// interface Account {
//   accountType: AccountType;
//   accountName: string;
//   openingBalance: string; // Keep it as a string in the form
//   description: string;
// }

// const AccountForm = () => {
//   const [accounts, setAccounts] = useState<Account[]>([]);

//   // Initialize form with react-hook-form and zod resolver
//   const form = useForm<z.infer<typeof AccountSchema>>({
//     resolver: zodResolver(AccountSchema),
//     defaultValues: {
//       accountType: "Bank account",
//       accountName: "",
//       openingBalance: "",
//       description: "",
//     },
//   });

//   // Handle form submission
//   const onSubmit = (data: any) => {
//     const newAccount: Account = {
//       accountType: data.accountType,
//       accountName: data.accountName,
//       openingBalance: data.openingBalance, // Keep this as it is from the form (string)
//       description: data.description,
//     };

//     setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
//   };

//   return (
//     <div className="w-full mx-auto p-6">
//       <HeaderBox title="Add New Account" subtext="" />
//       <Form {...form}>
//         {/* Account Form */}
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex w-2/6 flex-col justify-center pt-0">
//           {/* Account Type */}
//           <FormField name="accountType" control={form.control} render={({ field }) => (
//             <FormItem>
//               <FormLabel>Account Type</FormLabel>
//               <FormControl>
//                 <Select {...field}>
//                   <SelectTrigger className="w-full p-2 border rounded-md">
//                     <span>{field.value || "Select an account type"}</span>
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       <SelectLabel>Choose Account Type</SelectLabel>
//                       <SelectItem value="Bank account">Bank Account</SelectItem>
//                       <SelectItem value="Cash account">Cash Account</SelectItem>
//                       <SelectItem value="Credit Card account">Credit Card Account</SelectItem>
//                       <SelectItem value="Checking account">Checking Account</SelectItem>
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//             </FormItem>
//           )} />

//           {/* Account Name */}
//           <FormField name="accountName" control={form.control} rules={{ required: "Account name is required" }} render={({ field }) => (
//             <FormItem>
//               <FormLabel>Account Name</FormLabel>
//               <FormControl>
//                 <Input {...field} placeholder="Enter account name" className="w-full p-2 border rounded-md" />
//               </FormControl>
//               <FormMessage className="form-message mt-2" />
//             </FormItem>
//           )} />

//           {/* Opening Balance */}
//           <FormField name="openingBalance" control={form.control} render={({ field }) => (
//             <FormItem>
//               <FormLabel>Opening Balance</FormLabel>
//               <FormControl>
//                 <Input
//                   {...field}
//                   type="number"
//                   placeholder="Enter opening balance"
//                   className="w-full p-2 border rounded-md"
//                 />
//               </FormControl>
//               <FormMessage className="form-message mt-2" />
//             </FormItem>
//           )} />

//           {/* Description */}
//           <FormField name="description" control={form.control} render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Textarea {...field} placeholder="Enter account description" className="w-full p-2 border rounded-md" />
//               </FormControl>
//             </FormItem>
//           )} />

//           {/* Submit Button */}
//           <Button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
//             Add Account
//           </Button>
//         </form>
//       </Form>

//       {/* Accounts Table */}
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
//               <TableCell>{account.openingBalance}</TableCell> {/* Showing the opening balance */}
//               <TableCell>{account.description}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AccountForm;


    












//    update part 



// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from '@/components/ui/table';
// import accountDataJson from '@/data/data.json';
// import { Plus } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const Page = () => {
//     const [accounts, setAccounts] = useState(accountDataJson);
//     const [editAccount, setEditAccount] = useState(null); // State for editing account
//     const router = useRouter();

//     const navigateToAdd = () => {
//         router.push('/accounts/Add');
//     };

//     // Handle update button click, set the account to edit
//     const handleEdit = (account) => {
//         setEditAccount({ ...account });
//     };

//     // Handle save changes to account
//     const handleSave = () => {
//         const updatedAccounts = accounts.map((account) =>
//             account.id === editAccount.id ? editAccount : account
//         );
//         setAccounts(updatedAccounts);
//         setEditAccount(null); // Close edit form after saving
//     };

//     // Handle account deletion
//     const handleDelete = (id) => {
//         const updatedAccounts = accounts.filter((account) => account.id !== id);
//         setAccounts(updatedAccounts);
//     };

//     // Handle input change for editing
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditAccount((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     return (
//         <>
//             <div className="p-4 mt-3 text-right pr-6">
//                 <Button
//                     onClick={navigateToAdd}
//                     className="bg-[#0179FE] font-medium text-white"
//                 >
//                     <Plus /> Add Account
//                 </Button>
//             </div>
//             <div className="h-auto px-6 w-full">
//                 <h2 className="text-xl font-semibold mt-8">Accounts List</h2>
//                 <Table className="mt-4 w-full">
//                     <TableHeader className="bg-[#0179FE] text-white">
//                         <TableRow>
//                             <TableHead>Account Type</TableHead>
//                             <TableHead>Account Name</TableHead>
//                             <TableHead>Opening Balance</TableHead>
//                             <TableHead>Description</TableHead>
//                             <TableHead>Actions</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.id}>
//                                 <TableCell>{account.account_type}</TableCell>
//                                 <TableCell>{account.account_name}</TableCell>
//                                 <TableCell>{account.opening_balance}</TableCell>
//                                 <TableCell>{account.description}</TableCell>
//                                 <TableCell>
//                                     <button
//                                         onClick={() => handleEdit(account)}
//                                         className="bg-[#0179FE] text-white px-2 py-1 rounded mr-2"
//                                     >
//                                         Update
//                                     </button>
//                                     {/* <button
//                                         onClick={() => handleDelete(account.id)}
//                                         className="bg-red-500 text-white px-2 py-1 rounded"
//                                     >
//                                         Delete
//                                     </button> */}
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>

//                 {editAccount && (
//                     <div className="mt-8">
//                         <h3 className="text-xl pb-4 font-semibold">Update Account</h3>
//                         <form>
//                             <div className="mb-4">
//                                 <label htmlFor="account_type" className="block text-sm font-medium">
//                                     Account Type
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="account_type"
//                                     name="account_type"
//                                     value={editAccount.account_type}
//                                     onChange={handleChange}
//                                     className="w-full border rounded p-2 mt-1"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="account_name" className="block text-sm font-medium">
//                                     Account Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="account_name"
//                                     name="account_name"
//                                     value={editAccount.account_name}
//                                     onChange={handleChange}
//                                     className="w-full border rounded p-2 mt-1"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="opening_balance" className="block text-sm font-medium">
//                                     Opening Balance
//                                 </label>
//                                 <input
//                                     type="number"
//                                     id="opening_balance"
//                                     name="opening_balance"
//                                     value={editAccount.opening_balance}
//                                     onChange={handleChange}
//                                     className="w-full border rounded p-2 mt-1"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="description" className="block text-sm font-medium">
//                                     Description
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="description"
//                                     name="description"
//                                     value={editAccount.description}
//                                     onChange={handleChange}
//                                     className="w-full border rounded p-2 mt-1"
//                                 />
//                             </div>

//                             <div className="flex gap-2">
//                                 <button
//                                     type="button"
//                                     onClick={handleSave}
//                                     className="bg-[#0179FE] text-white px-4 py-2 rounded mr-2"
//                                 >
//                                     Update
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => setEditAccount(null)}
//                                     className="bg-gray-300  px-4 py-2 rounded"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default Page;
