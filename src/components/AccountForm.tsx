"use client"

import React from 'react'
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
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
    <section className='account-form'>
        
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <div className='flex gap-44'>
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
                        className='input-class'
                        {...field}
                        />
                    </FormControl>

                </div>
            </div>
          )}
        />
        <FormField
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
        /></div>
        <div className='flex gap-44'>
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
                        className='input-class'
                        {...field}
                        />
                    </FormControl>

                </div>
            </div>
          )}
        />
         <FormField
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
        />
        </div>
        <div className='flex gap-44'>
         <FormField
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
        />
        <FormField
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
        />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <div className="form-item">
                <FormLabel className='form-label'>
                    Description
                </FormLabel>
                <div className='flex  flex-col input-class w-56 h-32 '>
                    <FormControl>
                        <input
                        placeholder='max. 500 characters'
                        className='  '
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
        <Button type='submit' className='form-btn ml-2'>Cancel</Button>
      </form>
    </Form>
    </section>
  )
}

export default AccountForm