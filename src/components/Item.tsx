import Button from '@mui/material/Button';
import { Product } from '../types/product';
import { Wrapper } from './Card.styles';

type Props = {
  item: Product;
  handleAddToCart: (clickedItem: Product) => void;
};

const Item: React.FC<Props> = ({ item: product, handleAddToCart }) => (
  <Wrapper>
    <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
  </Wrapper>
);

export default Item;
