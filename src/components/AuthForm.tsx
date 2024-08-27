'use client';
import { Loader2 } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';

import { register, signIn } from '../lib/actions/user.actions';
import { SignInFormSchema } from '../lib/zod';
import FormInput from './FormInput';
import PlaidLinkAccount from './PlaidLinkAccount';

const AuthForm: FunctionComponent<AuthFormProps> = ({ type }) => {
    const formSchema = SignInFormSchema({ type });
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [Loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            if (type === 'sign-up') {
                const userData = {
                    firstName: values.firstName!,
                    lastName: values.lastName!,
                    address: values.address!,
                    city: values.city!,
                    state: values.state!,
                    postalCode: values.postalCode!,
                    dateOfBirth: values.dateOfBirth!,
                    ssn: values.ssn!,
                    email: values.email,
                    password: values.password,
                };

                const newUser = await register({
                    ...userData,
                    dateOfBirth: moment(
                        userData.dateOfBirth,
                        'dd/mm/yyyy'
                    ).toDate(),
                });

                setUser(newUser);
            } else if (type === 'sign-in') {
                const response = await signIn({
                    email: values.email,
                    password: values.password,
                });

                if (response) router.push('/');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
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
                <div className="flex flex-col gap-4">
                    <PlaidLinkAccount user={user} variant="primary" />
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            {type === 'sign-up' && (
                                <>
                                    <div className="flex gap-4">
                                        <FormInput
                                            label="First Name"
                                            placeholder="First Name"
                                            name="firstName"
                                            control={form.control}
                                        />
                                        <FormInput
                                            label="Last Name"
                                            placeholder="Last Name"
                                            name="lastName"
                                            control={form.control}
                                        />
                                    </div>
                                    <FormInput
                                        label="Address"
                                        placeholder="Address"
                                        name="address"
                                        control={form.control}
                                    />
                                    <FormInput
                                        label="City"
                                        placeholder="City"
                                        name="city"
                                        control={form.control}
                                    />
                                    <div className="flex gap-4">
                                        <FormInput
                                            label="State"
                                            placeholder="State"
                                            name="state"
                                            control={form.control}
                                        />
                                        <FormInput
                                            label="Zip Code"
                                            placeholder="Zip Code"
                                            name="postalCode"
                                            control={form.control}
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <FormInput
                                            label="Date of Birth"
                                            placeholder="dd/mm/yyyy"
                                            name="dateOfBirth"
                                            control={form.control}
                                        />
                                        <FormInput
                                            label="SSN"
                                            placeholder="ssn"
                                            name="ssn"
                                            control={form.control}
                                        />
                                    </div>
                                </>
                            )}
                            <FormInput
                                control={form.control}
                                label="Username"
                                name="email"
                                placeholder="Enter your email address"
                            />
                            <FormInput
                                control={form.control}
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Please enter your password"
                            />

                            <div className="flex flex-col gap-4">
                                <Button
                                    type="submit"
                                    className="form-btn"
                                    disabled={Loading}
                                >
                                    {Loading ? (
                                        <>
                                            <Loader2
                                                size={20}
                                                className="animate-spin"
                                            />{' '}
                                            &nbsp; Loading...
                                        </>
                                    ) : type === 'sign-in' ? (
                                        'Sign In'
                                    ) : (
                                        'Sign Up'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <footer className="flex justify-center gap-1">
                        <p className="text-14 font-normal text-gray-600">
                            {type === 'sign-in'
                                ? "Don't have an account?"
                                : 'Already have an account?'}
                        </p>
                        <Link
                            href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
                            className="form-link"
                        >
                            {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    );
};

export default AuthForm;
