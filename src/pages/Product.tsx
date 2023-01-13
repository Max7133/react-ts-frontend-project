import React from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
  // gives an Object of all available Params in the api endpoint
  const { id } = useParams();
  return <div>Product id: {id}</div>;
};

export default Product;
