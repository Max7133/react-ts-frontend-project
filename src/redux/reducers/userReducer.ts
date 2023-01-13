import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axiosInstance from '../../common/api';
import {
  BaseUser,
  Credentials,
  ReturnedCredentials,
  User,
  UserReducer,
} from '../../types/user';

const initialState: UserReducer = {
  userList: [],
};

// gets the whole user list
/** Fetch all the users from API*/
export const fetchAllUsers = createAsyncThunk('fetchAllUsers', async () => {
  try {
    const response = await axiosInstance.get('users');
    const data: User[] = response.data;
    return data;
  } catch (e) {
    const error = e as AxiosError;
    return error;
  }
});

/** Authenticate user */
export const authenticateCredential = createAsyncThunk(
  'authenticateCredentials',
  async ({ email, password }: Credentials, thunkAPI) => {
    // sending req to the server for the authentication
    try {
      const response = await axiosInstance.post('auth/login', {
        email,
        password,
      });
      // cast data in type object with property access_token
      const data: ReturnedCredentials = response.data;
      const result = await thunkAPI.dispatch(loginUser(data.access_token));
      return result.payload as User;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

/** Login user */
// Send the access token one more time to the Server for getting back the real User Object
export const loginUser = createAsyncThunk(
  'loginUser',
  async (access_token: string) => {
    try {
      const response = await axiosInstance.get('auth/profile', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      // getting the res data of User Object
      const data: User = response.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

/** register user via form and uploaded image */
export const createUserWithForm = createAsyncThunk(
  'createUserWithForm',
  async (user: BaseUser) => {
    try {
      // *TODO: If email exist, do not create new user and throw error* //
      // upload image and get back URL
      const res = await axiosInstance.post(
        'files/upload',
        {
          file: user.avatar[0],
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const url: string = res.data.location;
      // use the url with the rest of the properties in Profile to create new user
      const userRes = await axiosInstance.post('users', {
        ...user,
        avatar: url,
      });
      const data: User = userRes.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        }
        state.userList = action.payload;
      })
      .addCase(authenticateCredential.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        }
        state.currentUser = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        }
        state.currentUser = action.payload; // if succesfull login then append current user to action.payload
      })
      .addCase(createUserWithForm.fulfilled, (state, action) => {
        return state;
      });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
