import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState:{ cartIsVisible: false, notification: null},
    // ! we don`t add the async operation inside the reducers, because reducers are pure functions and async operation free.
    // ! we can add the async operation inside the components(eg: useEffect) or inside the action creators
    reducers: {
        toggle(state){
            state.cartIsVisible = !state.cartIsVisible
        }, 
        showNotification(state, action){
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice;