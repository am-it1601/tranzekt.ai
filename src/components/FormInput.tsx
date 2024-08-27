import React, { FunctionComponent } from 'react';

import { SignInFormSchema } from '../lib/zod';
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

import type { Control, FormProps, UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';
const formSchema = SignInFormSchema({ type: 'sign-up' });
type FormInputProps = {
  label: String;
  control: Control<z.infer<typeof formSchema>>;
  name: keyof z.infer<typeof formSchema>;
  placeholder: string;
  type?: string;
};

const FormInput: FunctionComponent<FormInputProps> = ({
  placeholder,
  type = 'text',
  control,
  label,
  name,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={type === 'password' ? 'password' : 'text'}
                {...field}
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
