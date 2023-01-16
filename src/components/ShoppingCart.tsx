import ShoppingCartItem from './ShoppingCartItem';
import { Wrapper } from './ShoppingCart.styles';
import { Product } from '../types/product';

type Props = {
  shoppingCartItems: Product[];
  addToCart: (clickedItem: Product) => void;
  removeFromCart: (id: number) => void;
};

const ShoppingCart: React.FC<Props> = ({
  shoppingCartItems,
  addToCart,
  removeFromCart,
}) => {
  const calcTotal = (items: Product[]) =>
    items.reduce(
      (ack: number, product) => ack + product.amount * product.price,
      0
    );

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {shoppingCartItems.length === 0 ? <p>No items in cart.</p> : null}
      {shoppingCartItems.map((product) => (
        <ShoppingCartItem
          key={product.id}
          item={product}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: €{calcTotal(shoppingCartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default ShoppingCart;
