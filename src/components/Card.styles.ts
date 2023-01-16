import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: #3b444b;
  background-color: #d3d3d3;
  width: 100%;
  border: 1px solid red;
  height: 100%;
  button {
    border-radius: 0 0 20px 20px;
  }
  img {
    max-height: 250px;
    object-fit: cover;
    border-radius: 20px 20px 20px 20px;
  }
  div {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
  }
`;
