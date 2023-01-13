import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/reduxHook';
import { createFormForProduct } from '../redux/reducers/productReducer';

const FormProduct = () => {
  const [file, setFile] = useState<File[] | null>(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const dispatch = useAppDispatch();
  const onAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    let fileArr = [];
    if (files?.length) {
      for (let i = 0; i <= files?.length; i++) {
        fileArr.push(files[i]);
      }
    }
    setFile(fileArr);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //logic for validating the data
    /*     dispatch(
      createFormForProduct({
        image: file,
        product: {
          title,
          price,
          // description etc.. (send data into dispatch function)
        },
      })
    ); */
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" multiple name="" id="" onChange={onAddFile} />
        <input
          type="text"
          name="title"
          id="product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default FormProduct;
