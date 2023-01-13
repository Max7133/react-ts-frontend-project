import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { AddProduct, Product } from '../../types/product';
import jwt from 'jsonwebtoken';

const dummyProducts = [
  {
    id: 1,
    title: 'A',
    price: 491,
    description:
      'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
    category: {
      id: 4,
      name: 'Shoes',
      image: 'https://api.lorem.space/image/shoes?w=640&h=480&r=8827',
    },
    images: [
      'https://api.lorem.space/image/shoes?w=640&h=480&r=1877',
      'https://api.lorem.space/image/shoes?w=640&h=480&r=312',
      'https://api.lorem.space/image/shoes?w=640&h=480&r=5418',
    ],
  },
  {
    id: 2,
    title: 'C',
    price: 333,
    description:
      'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
    category: {
      id: 2,
      name: 'Shoes',
      image: 'https://api.lorem.space/image/shoes?w=640&h=480&r=8827',
    },
    images: [
      'https://api.lorem.space/image/shoes?w=640&h=480&r=1877',
      'https://api.lorem.space/image/shoes?w=640&h=480&r=312',
      'https://api.lorem.space/image/shoes?w=640&h=480&r=751',
    ],
  },
  {
    id: 3,
    title: 'B',
    price: 150,
    description: 'Some legos',
    category: {
      id: 5,
      name: 'Laptop',
      image: 'https://api.lorem.space/image?w=640&h=480&r=3464',
    },
    images: [
      'https://api.lorem.space/image?w=640&h=480&r=9725',
      'https://api.lorem.space/image?w=640&h=480&r=828',
      'https://api.lorem.space/image?w=640&h=480&r=4717',
    ],
  },
];

const dummyUsers = [
  {
    id: 1,
    email: 'john@mail.com',
    password: 'changeme',
    name: 'Jhon',
    role: 'customer',
    avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=5062',
  },
  {
    id: 2,
    email: 'maria@mail.com',
    password: '12345',
    name: 'Maria',
    role: 'customer',
    avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=8504',
  },
  {
    id: 3,
    email: 'admin@mail.com',
    password: 'admin123',
    name: 'Admin',
    role: 'admin',
    avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=4991',
  },
];

const handler = [
  rest.get('https://api.escuelajs.co/api/v1/products', (req, res, ctx) => {
    return res(ctx.json(dummyProducts));
  }),
  rest.post(
    'https://api.escuelajs.co/api/v1/products',
    async (req, res, ctx) => {
      const product: AddProduct = await req.json();
      if (product.price < 1000) {
        return res(ctx.status(400, 'Data is invalid'));
      }
      return res(ctx.json(product));
    }
  ),
  rest.put(
    'https://api.escuelajs.co/api/v1/products/:id',
    async (req, res, ctx) => {
      const update: Partial<Product> = await req.json();
      const { id } = req.params as any;
      // updating Single Product in the whole dummyProducts Array
      const foundProduct = dummyProducts.find(
        (product) => product.id === parseInt(id)
      );
      if (foundProduct) {
        return res(
          ctx.json({
            ...foundProduct,
            ...update,
          })
        );
      } else {
        return res(ctx.status(404, 'Product was not found'));
      }
    }
  ),
  rest.post(
    'https://api.escuelajs.co/api/v1/files/upload',
    async (req, res, ctx) => {
      const file = await req.json();
      if (file) {
        return res(
          ctx.json({
            originalname: file.name,
            filename: file.name,
            location: `https://api.escuelajs.co/api/v1/files/${file.name}`,
          })
        );
      }
      return res(ctx.status(400, 'file is not defined'));
    }
  ),
  rest.get('https://api.escuelajs.co/api/v1/users', (req, res, ctx) => {
    return res(ctx.json(dummyUsers));
  }),
  rest.post(
    'https://api.escuelajs.co/api/v1/auth/login',
    async (req, res, ctx) => {
      const { email, password } = await req.json(); // no I can get email, password from user sent back to backend
      const foundUser = dummyUsers.find(
        (user) => user.email === email && user.password === password
      );
      if (foundUser) {
        const access_token = jwt.sign(foundUser, 'maxKey');
        return res(
          ctx.json({
            access_token,
          })
        );
      } else {
        return res(ctx.status(401, 'Unauthorized'));
      }
    }
  ),
  rest.get('https://api.escuelajs.co/api/v1/auth/profile', (req, res, ctx) => {
    const access_token_arr = req.headers.get('Authorization')?.split(' ');
    try {
      if (access_token_arr) {
        const access_token = access_token_arr[1];
        const foundUser = jwt.verify(access_token, 'maxKey');
        return res(ctx.json(foundUser));
      } else {
        return res(ctx.status(401, 'Unauthorized'));
      }
    } catch (e: any) {
      return res(ctx.json(e));
    }
  }),
];

const server = setupServer(...handler);
export default server;
