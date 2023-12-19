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

        replaceCart(state, action){
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },

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



export const  CartAction = cartSlice.actions;
export default cartSlice;