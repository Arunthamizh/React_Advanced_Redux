import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { CartAction } from '../../store/cart-slice';
import { useSelector } from 'react-redux';

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items)
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <CartItem
            key={index}
            title={item.name}
            quantity={item.quantity}
            total={item.totalPrice}
            price={item.price}
            id={item.id}
          />
          
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
