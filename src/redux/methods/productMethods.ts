import { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

export const orderByNameMethodAbc = (
  state: Product[],
  action: PayloadAction<'abc' | 'zyx'>
) => {
  action.payload === 'abc'
    ? state.sort((a, b) => a.title.localeCompare(b.title))
    : state.sort((a, b) => b.title.localeCompare(a.title));
  // return state - NOT NEEDED when modifying the State */
};

export const orderByNameMethodZyx = (
  state: Product[],
  action: PayloadAction<'abc' | 'zyx'>
) => {
  action.payload === 'zyx'
    ? state.sort((a, b) => b.title.localeCompare(a.title))
    : state.sort((a, b) => a.title.localeCompare(b.title));
  // return state - NOT NEEDED when modifying the State */
};

export const orderByPriceMethodAsc = (
  state: Product[],
  action: PayloadAction<number>
) => {
  action.payload === 123
    ? state.sort((a, b) => Number(a.price) - Number(b.price))
    : state.sort((a, b) => Number(b.price) - Number(a.price));
  // return state - NOT NEEDED when modifying the State */
};

export const orderByPriceMethodDes = (
  state: Product[],
  action: PayloadAction<number>
) => {
  action.payload === 987
    ? state.sort((a, b) => Number(b.price) - Number(a.price))
    : state.sort((a, b) => Number(a.price) - Number(b.price));
  // return state - NOT NEEDED when modifying the State */
};

export const deleteItemMethod = (
  state: Product[],
  action: PayloadAction<number>
) => {
  // anything I pass into this Function should be Type of Number
  return state.filter((item) => item.id !== action.payload); // returns New Array
};

export const getItemMethod = (
  state: Product[],
  action: PayloadAction<number>
) => {
  // anything I pass into this Function should be Type of Number
  return state.filter((item) => item.id === action.payload); // returns New Array
};

export const modifyItemMethod = (
  state: Product[],
  action: PayloadAction<number>
) => {
  state[action.payload] = {
    ...state[action.payload], // mod index
    title: state[action.payload].title + ' new',
  };
};
