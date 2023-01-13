import { Card } from '@mui/material';
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
  // order
  const orderName = () => {
    dispatch(orderByName('zyx'));
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
      <button onClick={orderName}>Sort</button>
      <button onClick={addProduct}>Add product</button>
      <Grid container spacing={3}>
        {products?.map((product, index) => (
          <Grid item key={product.id} xs={12} sm={4}>
            <Card>
              <Wrapper>
                <p>{product.title}</p>
                <img src={product.images[0]} />
                <p>{`${product.price} €`}</p>
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
