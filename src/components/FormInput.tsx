import React, { FunctionComponent } from 'react';

import { FormControl, FormField, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

import type { Control, FormProps, UseFormReturn } from 'react-hook-form';

const FormInput: FunctionComponent<
    { label: string; form: UseFormReturn } & HTMLInputElement
> = ({ placeholder, type, form, label, name }) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel className="form-label">{label}</FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                {...field}
                                className="input-class"
                                type={type}
                            />
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                    </div>
                </div>
            )}
        />
    );
};

export default FormInput;
