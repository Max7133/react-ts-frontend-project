import React from 'react';
import { Outlet } from 'react-router-dom';
import { Wrapper } from '../components/Card.styles';
import NavBar from '../components/NavBar';

const Root = () => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <Wrapper>
        <Outlet />
      </Wrapper>
      <footer>Made by Max7133 @2023</footer>
    </div>
  );
};

export default Root;
