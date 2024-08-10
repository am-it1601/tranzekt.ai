'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

import FormInput from './FormInput';

const formSchema = z.object({
    email: z.string().email({
        message: '',
    }),
});

const AuthForm: FunctionComponent<AuthFormProps> = ({ type }) => {
    const [user, setUser] = useState(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link
                    href="/"
                    className="flex cursor-pointer items-center gap-1"
                >
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Horizon logo"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                        Tranzekt.AI
                    </h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                        {user
                            ? 'Link Account'
                            : type === 'sign-in'
                              ? 'Sign In'
                              : 'Sign Up'}
                    </h1>
                    <p className="text-16 font-normal text-gray-600">
                        {user
                            ? 'Link your account to get Started.'
                            : 'Please fill in your details'}
                    </p>
                </div>
            </header>
            {user ? (
                <div className="flex flex-col gap-4"></div>
            ) : (
                <>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormInput
                                form={form}
                                label="Username"
                                name="username"
                            />
                            <FormInput
                                form={form}
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Please enter your password"
                            />

                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </>
            )}
        </section>
    );
};

export default AuthForm;
