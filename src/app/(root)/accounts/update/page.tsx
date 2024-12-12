// import React from 'react'
// import React, { useState } from 'react';




// interface Account {
//     id: string; // Account ID (Assuming it's unique and of type string)
//     account_type: string;
//     account_name: string;
//     opening_balance: number;
//     description: string;
// }

// const page = () => {
//     // State for holding accounts list and the account being edited
//     const [accounts, setAccounts] = useState<Account[]>(accountDataJson); // type accounts as an array of Account objects
//     const [editAccount, setEditAccount] = useState<Account | null>(null); // type editAccount as Account or null

    
//     // Function to handle editing an account
//     const handleEdit = (account: Account) => {
//         setEditAccount({ ...account });
//     };

//     const handleSave = () => {
//         if (editAccount) {
//             const updatedAccounts = accounts.map((account) =>
//                 account.id === editAccount.id ? editAccount : account
//             );
//             setAccounts(updatedAccounts);
//             setEditAccount(null); // Close the edit form after saving
//         }
//     };

//     // Function to delete an account by ID
//     const handleDelete = (id: string) => {
//         const updatedAccounts = accounts.filter((account) => account.id !== id);
//         setAccounts(updatedAccounts);
//     };

//     // Handle changes in the input fields of the edit form
//     const handleChange = (
//       e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//       // Ensure editAccount is not null before making changes
//       if (editAccount) {
//           const { name, value } = e.target;

//           // Handle each field based on its name
//           if (name === 'opening_balance') {
//               setEditAccount((prev) => ({
//                   ...prev!,
//                   [name]: parseFloat(value), // Convert to number if it's opening_balance
//               }));
//           } else {
//               setEditAccount((prev) => ({
//                   ...prev!,
//                   [name]: value,
//               }));
//           }
//       }
//   };

//   return (
//     <div>
//         {editAccount && (
//                     <div className="my-8">
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
//                                     className="bg-[#0179FE] text-white px-4 py-2 rounded"
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
//     </div>
//   )
// }

// export default page