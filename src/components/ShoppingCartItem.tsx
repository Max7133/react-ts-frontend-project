import Button from '@mui/material/Button';

import { Product } from '../types/product';
import { Wrapper } from './ShoppingCartItem.styles';

type Props = {
  item: Product;
  addToCart: (clickedItem: Product) => void;
  removeFromCart: (id: number) => void;
};

const ShoppingCartItem: React.FC<Props> = ({
  item: product,
  addToCart,
  removeFromCart,
}) => (
  <Wrapper>
    <div>
      <h3>{product.title}</h3>
      <div className="info">
        <p>Price: €{product.price}</p>
        <p>Total: €{(product.amount * product.price).toFixed(2)}</p>
      </div>
      <div className="buttons">
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => removeFromCart(product.id)}
        >
          -
        </Button>
        <p>{product.amount}</p>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => addToCart(product)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={product.images} alt={product.title} />
  </Wrapper>
);

export default ShoppingCartItem;
