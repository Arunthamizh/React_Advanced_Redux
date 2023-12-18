import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState:{ cartIsVisible: false},
    // ! we don`t add the async operation inside the reducers, because reducers are pure functions and async operation free.
    // ! we can add the async operation inside the components(eg: useEffect) or inside the action creators
    reducers: {
        toggle(state){
            state.cartIsVisible = !state.cartIsVisible
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice;