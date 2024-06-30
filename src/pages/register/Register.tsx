import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterFormFields } from './types';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { validationError } from '../../constants/validationError';
import { endpoint } from '../../constants/endpoint';

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormFields>()
  const { errorMessage, loading, signInOrSignUpHandler } = useContext(AuthContext);

  const registerHandler: SubmitHandler<RegisterFormFields> = async (formData: RegisterFormFields) => {
    signInOrSignUpHandler(endpoint.register('users/register'), formData)
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>
      {errorMessage && (
        <p className="mt-5 text-sm text-secondary text-center">{errorMessage}</p>
      )}
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(registerHandler)}>
          <div className="mt-2">
            <InputField
              name="name"
              register={register('name', { required: validationError.NAME_REQUIRED })}
              placeholder="Name"
              errors={errors}
            />
          </div>
          <div className="mt-2">
            <InputField
              type="email"
              name="email"
              register={register('email', { required: validationError.EMAIL_REQUIRED })}
              placeholder="Email"
              errors={errors}
            />
          </div>
          <div className="mt-2">
            <InputField
              name="password"
              register={register('password', {
                required: validationError.PASSWORD_REQUIRED,
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                  message: validationError.PASSWORD_STRENGTH
                },
              })}
              placeholder="Password"
              errors={errors}
              type="password"
            />
          </div>
          <Button title="SIGN UP" loading={loading} />
        </form>
        <p className="mt-5 text-center text-sm text-gray-500">
          <Link to="/login" className="font-semibold leading-6 text-primary hover:text-primary-light">
            Already have an account? Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;