import React from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { yupResolver } from '@hookform/resolvers/yup';

import { BaseUser } from '../types/user';
import { registrationSchema } from '../validation/registrationSchema';
import { useAppDispatch } from '../hooks/reduxHook';
import { createUserWithForm } from '../redux/reducers/userReducer';

const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  // register argument for tracking/reading value data
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BaseUser>({
    resolver: yupResolver(registrationSchema), // I passed the rule for password
  });
  const onSubmit: SubmitHandler<BaseUser> = (data) => {
    dispatch(createUserWithForm(data));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="name" {...register('name')} />
        <p>{errors.name?.message}</p>
        <input type="email" placeholder="email" {...register('email')} />
        <p>{errors.email?.message}</p>
        <p>Enter password</p>
        <input type="password" {...register('password')} />
        {errors.password?.message}
        <p>Confirm password</p>
        <input type="password" {...register('re_password')} />
        {errors.re_password?.message}
        <p>Upload avatar</p>
        <input type="file" {...register('avatar')} />
        <p>{errors.avatar?.message}</p>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
