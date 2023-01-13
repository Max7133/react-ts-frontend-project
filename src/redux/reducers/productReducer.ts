import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from '../../common/api';

import {
  AddProduct,
  CreateFormForProduct,
  EditProduct,
  Product,
} from '../../types/product';
import {
  deleteItemMethod,
  modifyItemMethod,
  orderByNameMethodAbc,
  orderByNameMethodZyx,
  orderByPriceMethodAsc,
  orderByPriceMethodDes,
} from '../methods/productMethods';

// productReducer list 1 Array of Product
const initialState: Product[] = [];

// createAsyncThunk - for creating a asynchronous function
// req 2 Parameters: 1. Name of the process (needs to be unique!), 2. A async Function - will be executed once getAllProducts Action is Dispatched
export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
  try {
    const res: AxiosResponse<any | Error, any> = await axiosInstance.get(
      'products'
    );
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
});

/** receives an image file and a Product Object of type AddProduct. 1st, upload image, then get image link, then create Product with image link */
export const createFormForProduct = createAsyncThunk(
  'createOneProductWithForm',
  async ({ images, product }: CreateFormForProduct) => {
    let location: string[] = [];
    // sending binary file
    try {
      for (let i = 0; i < images.length; i++) {
        const res = await axiosInstance.post('files/upload', images[i]);
        const data = res.data;
        location.push(data);
      }
      const productRes = await axiosInstance.post('products', {
        // spread if I want to push
        ...product,
        images: [...product.images, ...location], // send images Array & append the link returned from the 1st call into it
      });
      return productRes.data;
    } catch (e) {
      const error = e as AxiosError;
      if (error.request) {
        console.log('error from the request');
      } else if (error.response) {
        console.log('error from the response');
      } else {
        console.log(error.config);
      }
    }
  }
);

export const createSingleProduct = createAsyncThunk(
  'createOneProduct',
  async (product: AddProduct) => {
    try {
      const res: AxiosResponse<Product, any> = await axiosInstance.post(
        'products',
        product
      );
      return res.data;
    } catch (e: any) {
      console.log(e.response.status, e.response.statusText);
    }
  }
);

/** For mod product, I need ID and UPDATE object
 * @id: number
 * @update: Partial\<Product> - Partial makes all off the properties of Product into optional
 * @return updated product or error object
 */
export const editProduct = createAsyncThunk(
  'editProduct',
  async ({ id, update }: EditProduct) => {
    try {
      const res: AxiosResponse<Product, any> = await axiosInstance.put(
        `products/${id}`,
        update
      );
      return res.data;
    } catch (e: any) {
      console.log(e.response.status, e.response.statusText);
    }
  }
);

// createSlice is a Function that receives 1 arg of Type Object
const productSlice = createSlice({
  // Mandatory Properties, name - Unique Index that will be used in the Store, initialState, reducers
  name: 'productSlice',
  initialState: initialState,
  // manages normal synchronous process
  // it is presented under the Object and Methods
  reducers: {
    // inside here only temp changes in the API
    // When changing the State, I don't need to return it || When NOT changing the State, I need to return it (for e.g. Delete something from original State)
    orderByName: orderByNameMethodAbc || orderByNameMethodZyx,
    orderByPrice: orderByPriceMethodAsc || orderByPriceMethodDes,
    deleteItem: deleteItemMethod,
    modifyItem: modifyItemMethod,
  },
  // it is presented under a Method that will help in adding the Result from these asynchronous process in to the State of the Store
  extraReducers: (build) => {
    // adding getAllProducts
    // state - current state that can be modified; action - Object that contains the data (data lives inside action.payload)
    build
      .addCase(getAllProducts.fulfilled, (state, action) => {
        if (action.payload && 'message' in action.payload) {
          return state;
        } else if (!action.payload) {
          return state;
        }
        return action.payload;
        // same as setState(action.payload)
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        console.log('error in getting the data');
        return state;
      })
      // if it is pending, state will be original
      .addCase(getAllProducts.pending, (state, action) => {
        console.log('loading data...');
        return state;
      })
      .addCase(createSingleProduct.fulfilled, (state, action) => {
        // if it's not undefined
        if (action.payload) {
          state.push(action.payload);
        } else {
          return state;
        }
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        return state.map((product) => {
          // if found a matching product
          if (product.id === action.payload?.id) {
            // return a newly updated product
            return action.payload;
          }
          return product;
        });
      })
      .addCase(createFormForProduct.fulfilled, (state, action) => {
        if (action.payload) {
          state.push(action.payload);
        } else {
          return state;
        }
      });
  },
});

const productReducer = productSlice.reducer;
export const { orderByName, orderByPrice, deleteItem, modifyItem } =
  productSlice.actions;
export default productReducer;
