import {createSlice} from '@reduxjs/toolkit';
import LocalStorage from '../../utils/LocalStorage';

export const counterSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    productCount: 0,
    total: 0,
    price: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      // Add the new item to the products array
      const itemId = action.payload;
      const existingItem = state.products.find(
        item => item?._id === itemId?._id,
      );
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.products.push(itemId);
        state.products.map(x => {
          return (x.qty = 1);
        });
      }
    },
    removeFromCart: (state, action) => {
      //remove from cart used in cart page delete icon to delete individual product
      const itemId = action.payload;
      state.products = state.products.filter(item => item._id !== itemId);
    },
    incrementQuantity: (state, action) => {
      //Increment quantity by adding key in addtoCart reducer method
      const itemId = action.payload;
      const item = state.products.find(item => item._id === itemId);
      if (item) {
        item.qty += 1;
      }
    },

    decrementQuantity: (state, action) => {
      //Decrement quantity by adding key in addtoCart reducer method
      const itemId = action.payload;
      const item = state.products.find(item => item._id === itemId);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },
    calculateTotalPrice: state => {
      //Calculating Total in cart page and product page reducer method
      let totalPrice = 0;
      state.products.forEach(item => {
        totalPrice += item.price * item.qty;
      });
      state.total = totalPrice;
      let TotalPrice = calculateTotalPrice(state);
      LocalStorage.saveData('TotalPrice', state.total);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  calculateTotalPrice,
} = counterSlice.actions;

const COUNTER_SLICE = counterSlice.reducer;

export default COUNTER_SLICE;
