import { createSlice } from "@reduxjs/toolkit";

const cartBoxSlice = createSlice({
  name: "cartBox",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          quantity: 1,
          price: newItem.price,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalQuantity++;
      state.changed = true;
    },
    removeFromCart(state, action) {
      const newId = action.payload;
      const existingItem = state.items.find((item) => item.id === newId);
      if (existingItem && existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== newId);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalQuantity--;
      state.changed = true;
    },
  },
});

export default cartBoxSlice;
