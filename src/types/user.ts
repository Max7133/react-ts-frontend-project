export type Role = 'admin' | 'customer';

export interface User extends BaseUser {
  id: number;
  role: Role;
  avatar: string;
  re_password: undefined;
}

export interface BaseUser {
  email: string;
  password: string;
  re_password?: string;
  name: string;
  avatar: FileList | string;
}

export interface UserReducer {
  userList: User[];
  currentUser?: User;
  access_token?: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface ReturnedCredentials {
  access_token: string;
}
