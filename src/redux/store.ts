import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer';
import userReducer from './reducers/userReducer';

export const createStore = () => {
  return configureStore({
    reducer: {
      productReducer,
      userReducer,
    },
  });
};
/* // Globally used info
export const store = configureStore({
  // modifies Global State
  reducer: {
    // connecting reducer to the Store
    productReducer,
  },
  // action - instruction (that is passed in to the reducer) on how to modify data in the Global State
}); */
const store = createStore();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
