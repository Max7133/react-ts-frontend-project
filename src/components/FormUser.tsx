import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/reduxHook';
import {
  authenticateCredential,
  loginUser,
} from '../redux/reducers/userReducer';

const FormUser = () => {
  const dispatch = useAppDispatch();
  const access_token = localStorage.getItem('access_token');
  useEffect(() => {
    if (access_token)
      // get access token
      dispatch(loginUser(access_token));
  });
  const onLoginUser = (email: string, password: string) => {
    dispatch(authenticateCredential({ email, password }));
  };
  return <div>formUser</div>;
};

export default FormUser;
