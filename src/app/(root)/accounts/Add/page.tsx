"use client"; // This makes the component a Client Component

import React, { useState } from "react";
import HeaderBox from '@/components/HeaderBox';

import { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectGroup } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"

type AccountType = "Bank account" | "Cash account" | "Credit Card account" | "Checking account";
const AccountTypeSchema = z.enum(["Bank account", "Cash account", "Credit Card account", "Checking account"]);

// Define the full Account schema
const AccountSchema = z.object({
  accountType: AccountTypeSchema,        // Account type must match one of the enum values
  accountName: z.string().min(1, "Account name is required"), // Account name is required and must be a string
  openingBalance: z.string().optional(),
//   refine(val => !isNaN(parseFloat(val)), {
//     message: "Opening balance must be a number", // Custom message if opening balance is not a number
//   }).transform(val => parseFloat(val)), // Convert openingBalance to number
  description: z.string().optional(), // Description is optional
});

interface Account {
  accountType: AccountType;
  accountName: string;
  openingBalance: number;
  description: string;
}


const AccountForm = () => {

  const [accounts, setAccounts] = useState<Account[]>([]);

//   const {
//     form,
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       accountType: "Bank account",
//       accountName: "",
//       openingBalance: "", // Initial value is a string, since form inputs default to strings
//       description: "",
//     },
//   });

  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
        accountType: "Bank account",
        accountName: "",
        openingBalance: "0", // Initial value is a string, since form inputs default to strings
        description: "",
      },
  })
  // Handle form submission
  const onSubmit = (data: any) => {
    // Convert openingBalance to number here before saving
    // const openingBalance = parseFloat(data.openingBalance);

    // // Validation: Ensure openingBalance is a valid number
    // if (!data.accountName || isNaN(openingBalance)) {
    //   alert("Please fill in all fields correctly");
    //   return;
    // }
  
    const newAccount: Account = {
      accountType: data.accountType,
      accountName: data.accountName,
      openingBalance: openingBalance,
      description: data.description,
    };

    setAccounts((prevAccounts) => [...prevAccounts, newAccount]);

    // Reset form after submission
    reset();
  };

  return (
    <div className="w-full mx-auto p-6">
      <HeaderBox title="Add New Account" subtext="" />
     <Form {...form}>
        
      {/* Account Form with ShadCN Form Components and React Hook Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex w-2/6 flex-col justify-center pt-0">
        
        {/* Account Type */}
        <FormField
          name="accountType"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger className="w-full p-2 border rounded-md">
                    <span>{field.value}</span>
                  </SelectTrigger>
                  <SelectContent className="focus:ring-blue-500 bg-white focus:border-blue-500 focus:outline-none">
                    <SelectGroup>
                      <SelectLabel>Choose Account Type</SelectLabel>
                      <SelectItem value="Bank account">Bank Account</SelectItem>
                      <SelectItem value="Cash account">Cash Account</SelectItem>
                      <SelectItem value="Credit Card account">Credit Card Account</SelectItem>
                      <SelectItem value="Checking account">Checking Account</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Account Name */}
        <FormField
          name="accountName"
          control={form.control}
          rules={{ required: "Account name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter account name"
                  className="w-full p-2 border rounded-md"
                />
              </FormControl>
               
            <FormMessage className="form-message mt-2" />
              
            </FormItem>
          )}
        />

        {/* Opening Balance */}
        <FormField
          name="openingBalance"
          control={form.control}
          rules={{
            required: "Opening balance is required",
            validate: (value) => {
              // Convert the value to number for validation
              const numericValue = parseFloat(value);
              return !isNaN(numericValue) || "Opening balance must be a number";
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opening Balance</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter opening balance"
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => {
                    // Manually convert string to number onChange
                    field.onChange(parseFloat(e.target.value) || "");
                  }}
                />
              </FormControl>
            
                <FormMessage />
              
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter account description"
                  className="w-full p-2 border rounded-md"
                />
              </FormControl>
            </FormItem>
          )}
        />  

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Account
        </Button>
      </form>
      </Form> 

      {/* Accounts Table */}
      <h2 className="text-xl font-semibold mt-8">Accounts List</h2>
      <Table className="mt-4 w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Account Type</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead>Opening Balance</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account, index) => (
            <TableRow key={index}>
              <TableCell>{account.accountType}</TableCell>
              <TableCell>{account.accountName}</TableCell>
              <TableCell>{account.openingBalance}</TableCell>
              <TableCell>{account.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountForm;
