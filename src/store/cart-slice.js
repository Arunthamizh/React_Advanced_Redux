import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        // totalAmount: 0 
    },
    // ! we don`t add the async operation inside the reducers, because reducers are pure functions and async operation free.
    // ! we can add the async operation inside the components(eg: useEffect) or inside the action creators
    reducers:{
        addItemToCart(state, action){

            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity ++;
            if(!existingItem) {
                
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            } else {

                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
        },
        removeItemFromCart(state, action){
            const ItemId = action.payload;
            const existingItem = state.items.find(item => item.id === ItemId);
            state.totalQuantity--;
            if(existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== ItemId);
            }
            else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price; 
            }
        }
    }
});

// * Action creators
// ? why action creators? instead of using dispatch in the components useEffect
// @  We can do it in th components and its not a bad idea (to make it as lean as possible we are using action creators)
// @  to make the component as lean as possible (less code) and move that logic to action creators


// ! It allows accept the dispatch function as an argument as same as action objects(like action type)
// ! It will execute the function for us and gives a dispatch as an argument automatically
// ! so that we can dispatch other actions as part of side effects
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

export const  CartAction = cartSlice.actions;
export default cartSlice;