import { AnyAction, ThunkMiddleware } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import {
  authenticateCredential,
  fetchAllUsers,
  loginUser,
} from '../../redux/reducers/userReducer';

import { createStore, RootState } from '../../redux/store';
import server from '../shared/server';

// in order to read the reducers, I need to get the store
let store: ToolkitStore<
  RootState,
  AnyAction,
  [ThunkMiddleware<RootState, AnyAction, undefined>]
>;

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  store = createStore();
});

// clean up after all tests
afterAll(() => {
  server.close();
});

describe('Test userReducer', () => {
  test('Should return initial state', () => {
    // get initial state of userReducer
    const initialState = store.getState().userReducer;
    expect(initialState.userList.length).toBe(0); // userList would be empty Array
    expect(initialState.currentUser).toBeUndefined(); // currentUser would be Undefined
  });
  test('should fetch user list', async () => {
    await store.dispatch(fetchAllUsers());
    const state = store.getState().userReducer;
    expect(state.userList.length).toBe(3);
  });
  test('should login user with right credential', async () => {
    const credentials = {
      email: 'john@mail.com',
      password: 'changeme',
    };
    // if dispatch is succesful,
    await store.dispatch(authenticateCredential(credentials));
    const currentUser = store.getState().userReducer.currentUser;
    expect(currentUser).toBeDefined();
  });
});
