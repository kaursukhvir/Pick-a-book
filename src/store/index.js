import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cart-slice";
import cartBoxSlice from "./cartBox-slice";

const store = configureStore({
  reducer: { cart: cartSlice.reducer, cartBox: cartBoxSlice.reducer },
});

export const cartActions = cartSlice.actions;
export const cartBoxActions = cartBoxSlice.actions;

export default store;
