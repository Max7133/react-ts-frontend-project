import { Card, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid/Grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Wrapper } from '../components/Card.styles';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import {
  getAllProducts,
  createSingleProduct,
  orderByName,
  deleteItem,
  modifyItem,
  orderByPrice,
} from '../redux/reducers/productReducer';

const Products = () => {
  const [search, setSearch] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const products = useAppSelector((state) =>
    state.productReducer.filter((item) => {
      return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
    })
  );
  console.log('ssssssssssss', search, 'some string', products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  // order by name
  const orderNameAbc = () => {
    if (orderByName) {
      dispatch(orderByName('abc'));
    }
  };
  const orderNameZyx = () => {
    if (orderByName) {
      dispatch(orderByName('zyx'));
    }
  };

  // order by price
  const orderPriceAsc = () => {
    if (orderByPrice) {
      dispatch(orderByPrice(123));
    }
  };
  const orderPriceDes = () => {
    if (orderByPrice) {
      dispatch(orderByPrice(987));
    }
  };

  // add product
  const addProduct = () => {
    dispatch(
      createSingleProduct({
        title: 'Shoes',
        price: 100,
        description: 'description of shoes',
        categoryId: 1,
        images: ['https://placeimh.com/640/480/any'],
      })
    );
  };

  const deleteProduct = (id: number) => {
    dispatch(deleteItem(id));
  };

  const modifyProduct = (index: number) => {
    dispatch(modifyItem(index));
  };

  // upload files
  const uploadFiles = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    files &&
      axios
        .post(
          'https//api.escuelajs.co/api/v1/files/upload',
          {
            file: files[0],
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => console.log(res.data));
  };

  return (
    <div>
      <div>
        <label htmlFor="search">Search products</label>
        <input
          type="text"
          name="search"
          id="idsearch"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button onClick={addProduct}>Add product</button>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="sort-by-name">Sort by Name</InputLabel>
        <Select>
          <MenuItem onClick={orderNameAbc}>Sort by Ascending</MenuItem>
          <MenuItem onClick={orderNameZyx}>Sort by Descending</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="sort-by-price">Sort by Price</InputLabel>
        <Select>
          <MenuItem onClick={orderPriceAsc}>Sort by Ascending</MenuItem>
          <MenuItem onClick={orderPriceDes}>Sort by Descending</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        {products?.map((product, index) => (
          <Grid item key={product.id} xs={12} sm={4}>
            <Card>
              <Wrapper>
                <p>{product.title}</p>
                <img src={product.images[0]} />
                <p>{`${product.price} €`}</p>
                <p>{product.category.name}</p>
              </Wrapper>
              <button onClick={() => deleteProduct(product.id)}>
                Delete product
              </button>
              <button onClick={() => modifyProduct(index)}>
                Modify product
              </button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
