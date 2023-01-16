import { Card, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid/Grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Wrapper } from '../components/Card.styles';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import {
  getAllProducts,
  createSingleProduct,
  orderByName,
  deleteItem,
  modifyItem,
  orderByPrice,
} from '../redux/reducers/productReducer';
import Item from '../components/Item';
import { Product } from '../types/product';
import ShoppingCart from '../components/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import { StyledButton } from '../components/Products.styles';
import { AddShoppingCart } from '@mui/icons-material';
import Badge from '@mui/material/Badge/Badge';

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
        images: ['https://placeimg.com/640/480/any'],
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

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as Product[]);
  const getTotalItems = (items: Product[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);
  // is going to take in an Item
  const handleAddToCart = (clickedItem: Product) => {
    setCartItems((prev) => {
      // 1. Is the item already in cart, if it exist I need to update it instead of adding it to the Array
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        // If product exist, I will loop through all the products until it finds the item I clicked on and add + 1 to the amount
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // otherwise if it's the 1st time the item is added, I return the Array with all the prev stuff that was added to the cart
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
    // setting the cart items with previous state, and call the reduce method on it
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        // if im on the product I clicked on
        if (item.id === id) {
          // if the product amount is 1, then I will remove it from the Array
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }]; // otherwise I remove 1 from the amount
        } else {
          // if I'm not on the item I clicked on, then I return the Array with the product as it is, I don't do anything with it
          return [...ack, item];
        }
      }, [] as Product[])
    );
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
      <Button onClick={addProduct}>Add product</Button>
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
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <ShoppingCart
          shoppingCartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {products?.map((product, index) => (
          <Grid item key={product.id} xs={12} sm={4}>
            <Item item={product} handleAddToCart={handleAddToCart} />
            <Card>
              <Wrapper>
                <p>{product.title}</p>
                <img src={product.images[0]} />
                <p>{`${product.price} €`}</p>
                <p>{product.category.name}</p>
              </Wrapper>
              <Button onClick={() => deleteProduct(product.id)}>
                Delete product
              </Button>
              <Button onClick={() => modifyProduct(index)}>
                Modify product
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
