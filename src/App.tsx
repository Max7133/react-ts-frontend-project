import React from 'react';
import Home from './pages/Home';
import Product from './pages/Product';
import Products from './pages/Products';
import Profile from './pages/Profile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NonExistent from './pages/NonExistent';
import Root from './pages/Root';
import { Drawer, LinearProgress, Grid, Badge } from '@mui/material';

// this Object receives an Array and each Element must be of type Route Object
const router = createBrowserRouter([
  {
    path: '',
    // Root (Parent) Element with Outlet Placeholder
    element: <Root />,
    // list of children of the parent
    children: [
      {
        path: '',
        element: <Products />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:id',
        element: <Product />,
      },
      {
        path: '*',
        element: <NonExistent />,
      },
    ],
  },
]);

const App = () => {
  // <ThemeProvider theme={theme}>
  return <RouterProvider router={router} />;
  // </ThemeProvider>
};

export default App;
