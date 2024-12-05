"use client"

import React from 'react'
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import HeaderBox from '../components/HeaderBox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { number, z } from "zod"
import { divide } from 'lodash'
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  number: z.string(),
  balance: z.string(),
  accountNumber: z.string(),
  bankName: z.string(),
  ifscCode: z.string(),
  description: z.string()
})

const AccountForm = () => {

    
      // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  
  return (
    <>
     <div className="">
                <HeaderBox title="Add Account" subtext="" />
            </div>
    <div className=" py-6 z-40">
    <Select >
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Account Type" />
        </SelectTrigger>
        <SelectContent className="focus:ring-blue-500 bg-white focus:border-blue-500 focus:outline-none">
            <SelectItem value="BankAccount">
                Bank Account
            </SelectItem>
            <SelectItem value="CashAccount">
                Cash Account
            </SelectItem>
            <SelectItem value="CreditCardAccount">
                CreditCard Account
            </SelectItem>
            <SelectItem value="CheckingAccount">
                Checking Account
            </SelectItem>
        </SelectContent>
    </Select>
</div>
    
    <section className='account-form'>
       
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <div className="form-item">
                <FormLabel className='form-label'>
                    Account Name
                </FormLabel>
                <div className='flex w-full flex-col '>
                    <FormControl>
                        <input
                        placeholder=''
                        className='input-class w-56'
                        {...field}
                        />
                    </FormControl>

                </div>
            </div>
          )}
        />
        {/* <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <div className="form-item">
                <FormLabel className='form-label'>
                    Account Code
                </FormLabel>
                <div className='flex w-full flex-col '>
                    <FormControl>
                        <input
                        placeholder=''
                        className='input-class'
                        {...field}
                        />
                    </FormControl>

                </div>
            </div>
          )}
        /> */}

         <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <div className="form-item">
                <FormLabel className='form-label'>
                    Opening Balance
                </FormLabel>
                <div className='flex w-full flex-col '>
                    <FormControl>
                        <input
                        placeholder='INR'
                        className='input-class w-56'
                        {...field}
                        />
                    </FormControl>

                </div>
            </div>
          )}
        />
         {/* <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <div className="form-item">
                <FormLabel className='form-label'>
                    Account Number
                </FormLabel>
                <div className='flex w-full flex-col '>
                    <FormControl>
                        <input
                        placeholder=''
                        className='input-class'
                        {...field}
                        />
                    </FormControl>

                </div>
            </div>
          )}
        /> */}
        
        
         {/* <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <div className="form-item">
                <FormLabel className='form-label'>
                    Bank Name
                </FormLabel>
                <div className='flex w-full flex-col '>
                    <FormControl>
                        <input
                        placeholder=''
                        className='input-class'
                        {...field}
                        />
                    </FormControl>

                </div>
            </div>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="ifscCode"
          render={({ field }) => (
            <div className="form-item">
                <FormLabel className='form-label'>
                    IFSC
                </FormLabel>
                <div className='flex w-full flex-col '>
                    <FormControl>
                        <input
                        placeholder=''
                        className='input-class'
                        {...field}
                        />
                    </FormControl>

                </div>
            </div>
          )}
        /> */}
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <div className="form-item">
                <FormLabel className='form-label'>
                    Description
                </FormLabel>
                <div className=' '>
                    <FormControl>
                        <input
                        placeholder=''
                        className=' flex-col input-class w-56 h-32  '
                        {...field}
                        />
                    </FormControl>
                    

                </div>
                <div>
      <div className="flex items-center mt-2 space-x-2">
        <Checkbox className='border-gray-500' id="terms" />
        <Label className='text-slate-700' htmlFor="terms">Make This Primary</Label>
      </div>
    </div>
            </div>
          )}
        />
        

        <Button type="submit" className='form-btn'>Save</Button>
        {/* <Button type='submit' className='form-btn ml-2'>Cancel</Button> */}
      </form>
    </Form>
    </section>
    </>
  )
}


export default AccountForm