import { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

export const orderByNameMethod = (
  state: Product[],
  action: PayloadAction<'abc' | 'zyx'>
) => {
  if (action.payload === 'abc') {
    state.sort((a, b) => b.title.localeCompare(a.title));
  } else {
    state.sort((a, b) => a.title.localeCompare(b.title));
  }
  // return state - NOT NEEDED when modifying the State
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
