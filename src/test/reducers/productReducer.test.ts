import { AnyAction, ThunkMiddleware } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import {
  createFormForProduct,
  createSingleProduct,
  editProduct,
  getAllProducts,
  orderByName,
} from '../../redux/reducers/productReducer';
import { createStore, RootState } from '../../redux/store';
import { AddProduct } from '../../types/product';
import server from '../shared/server';

let store: ToolkitStore<
  RootState,
  AnyAction,
  [ThunkMiddleware<RootState, AnyAction, undefined>]
>;

// beforeAll would NOT run before any test suite run
beforeAll(() => {
  server.listen();
});

// means this function would be invoked after all the tests done
afterAll(() => {
  server.close();
});

// Will be invoked before every single test
beforeEach(() => {
  // before each test, I append 'store' into the new Value createStore
  store = createStore();
});

describe('Test all the actions', () => {
  test('Should return initial state', () => {
    expect(store.getState().productReducer.length).toBe(0);
  });
  test('Should fetch all products', async () => {
    await store.dispatch(getAllProducts());
    // getState returns the whole Global State
    expect(store.getState().productReducer.length).toBe(3);
  });
  test('Should add product', async () => {
    const createdProduct: AddProduct = {
      title: 'Test for adding product',
      description: 'creating product',
      price: 1000,
      categoryId: 1,
      images: [],
    };
    await store.dispatch(createSingleProduct(createdProduct));
    expect(store.getState().productReducer.length).toBe(1);
  });
  test('Should NOT add product', async () => {
    const createdProduct: AddProduct = {
      title: 'Test for adding product',
      description: 'creating product',
      price: -1000,
      categoryId: 1,
      images: [],
    };
    await store.dispatch(createSingleProduct(createdProduct));
    expect(store.getState().productReducer.length).toBe(0);
  });
  test('should order by name abc', async () => {
    await store.dispatch(getAllProducts());
    store.dispatch(orderByName('abc'));
    expect(store.getState().productReducer[0].title).toBe('A');
    expect(store.getState().productReducer[1].title).toBe('B');
    expect(store.getState().productReducer[2].title).toBe('C');
  });
  test('should update available product', async () => {
    // the store won't have any products, that's why I fetch/get all products first
    // everytime 1 single test is started the Store is refreshed, that means it starts as a Empty Store
    await store.dispatch(getAllProducts());
    await store.dispatch(
      editProduct({
        id: 1,
        update: {
          price: 500,
          title: 'modified title',
        },
      })
    );
    expect(
      store.getState().productReducer.find((product) => product.id === 1)?.price
    ).toBe(500);
    expect(
      store.getState().productReducer.find((product) => product.id === 1)?.title
    ).toBe('modified title');
  });
});
