import React from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';
import { validationError } from '../constants/validationError';

interface InputFieldProps {
  type?: 'text' | 'password' | 'email';
  register: UseFormRegisterReturn;
  placeholder?: string;
  errors?: FieldErrors;
  name: string
}

const InputField = ({ name, register, type = 'text', placeholder, errors }: InputFieldProps) => {
  const fieldError = errors?.[name]
  return (
    <div className="mt-2">
      <input
        type={type}
        {...register}
        placeholder={placeholder}
        className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
        aria-invalid={errors?.[name] ? 'true' : 'false'}
      />
      {fieldError?.type === 'required' && (
        <p role="alert" className="text-secondary">
          {(fieldError?.message as string) || validationError.REQUIRED}
        </p>
      )}

      {fieldError?.type === 'pattern' && (
        <p role="alert" className="text-secondary">
          {(fieldError?.message as string) || validationError.INVALID_PATTERN}
        </p>
      )}
    </div>
  );
}

export default InputField;