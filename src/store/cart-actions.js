import { uiActions } from "./ui-slice";
import { CartAction } from "./cart-slice";

// * Action creators
// ? why action creators? instead of using dispatch in the components useEffect
// @  We can do it in th components and its not a bad idea (to make it as lean as possible we are using action creators)
// @  to make the component as lean as possible (less code) and move that logic to action creators


// ! It allows accept the dispatch function as an argument as same as action objects(like action type)
// ! It will execute the function for us and gives a dispatch as an argument automatically
// ! so that we can dispatch other actions as part of side effects


export const  fetchCartData = () => {

    return async(dispatch) => {
        
        const fetchData = async() => {
    
            const response = await fetch(
                "https://react-cart-eed7d-default-rtdb.firebaseio.com/cart.json"
            )
        
            if(!response.ok) {
                throw new Error("Could not fetch cart data");
            }
        
            const data = await response.json();
        
            return data
        }
    
        try {
            const cartData = await fetchData();

            dispatch(CartAction.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))
        }
        catch (e) {
            console.log(e);
    
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error!",
                  message: "Sending cart data failed!",
                })
              );
        }
    }
}  


export const sendCartData = (cart) => {
    return async(dispatch) => {
        dispatch(
            uiActions.showNotification({
              status: "pending",
              title: "Sending...",
              message: "Sending cart data!",
            })
          );

          const sendRequest = async () => {
              
              const response = await fetch(
                "https://react-cart-eed7d-default-rtdb.firebaseio.com/cart.json",
                {
                  method: "PUT",
                  body: JSON.stringify(cart),
                }
              );
        
              if (!response.ok) {
                throw new Error("Sending cart data failed");
              } 
          }

          try{
            await sendRequest();
            dispatch(
              uiActions.showNotification({
                status: "success",
                title: "Success!",
                message: "Sent cart data successfully!",
              })
            );
          }
          catch (e) {

            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error!",
                  message: "Sending cart data failed!",
                })
              );
          }


    }
}