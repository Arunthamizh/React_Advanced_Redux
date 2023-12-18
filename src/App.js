import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { CartAction } from "./store/cart-slice";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/cart-slice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCartHook = (state) => {
    console.log("state", state);

    return state.ui.cartIsVisible;
  };
  const showCart = useSelector(showCartHook);
  const cart = useSelector((state) => state.cart);
  const notifications = useSelector((state) => state.ui.notification);

  useEffect(() => {

    // ! Below is the example of handling async data in the components using useEffect hook

    // *  Action Creators
    // ...................
    // ! codes are moved to the store/cart-slice.js as sendCartData
    // import { sendCartData } from "./store/cart-slice";
    // ..............

    if(isInitial){
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));

  }, [cart, dispatch]);

  return (
    <Fragment>
      {notifications && (
        <Notification
          state={notifications.status}
          title={notifications.title}
          message={notifications.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
