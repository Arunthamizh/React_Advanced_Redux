import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';




function App() {
  const showCartHook = (state) => {
    console.log('state',state);

  return  state.ui.cartIsVisible
  };
  const showCart = useSelector(showCartHook);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
