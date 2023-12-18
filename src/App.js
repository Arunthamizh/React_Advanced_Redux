import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { CartAction } from './store/cart-slice';



function App() {
  const showCartHook = (state) => {
    console.log('state',state);

  return  state.ui.cartIsVisible
  };
  const showCart = useSelector(showCartHook);
  const cart = useSelector(state => state.cart);

  useEffect(() => {

    fetch('https://react-cart-eed7d-default-rtdb.firebaseio.com/cart.json',{
      method: 'PUT',
      body: JSON.stringify(cart)
    }).then((response) => {
      const data =  response.json();
      console.log('fetch data',data);
    });
  },[cart])

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
