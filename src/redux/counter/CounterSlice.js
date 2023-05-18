import {createSlice} from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    productCount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      // Add the new item to the products array
      state.products.push(action.payload);
      // console.log('state::::', state, action);
    },
    removeFromCart: (state, action) => {
      //remove from cart used in cart page delete icon to delete individual product
      const itemId = action.payload;
      state.products = state.products.filter(item => item._id !== itemId);
      console.log('action::::', action, state);
    },
    incrementQuantity: (state, action) => {
      console.log('incrementQuantity::::', state, action);
      const itemId = action.payload;
      const item = state.products.find(item => item._id === itemId);
      if (item) {
        state.productCount += 1;
      }
    },
    decrementQuantity: (state, action) => {
      console.log('DecrementQuantity::::', state, action);
      const productId = action.payload;
      const product = state.products.find(item => item._id === productId);
      if (product && state.productCount > 1) {
        state.productCount -= 1;
      }
    },
    // totalprice: (state) => {
    //   let price = 0;
    //   let total = 0;
    //   state.products.forEach((item) => {
    //     price += item.price * item.productCount;
    //     total = price;
    //   });
    //   state.products.price = price;
    //   state.products.total = total;
    // }
  },
});

export const {addToCart, removeFromCart, incrementQuantity, decrementQuantity} =
  counterSlice.actions;

const COUNTER_SLICE = counterSlice.reducer;

export default COUNTER_SLICE;
