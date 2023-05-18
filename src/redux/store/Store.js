import {configureStore} from '@reduxjs/toolkit';
import COUNTER_SLICE from '../counter/CounterSlice';

const store = configureStore({
  reducer: {
    products: COUNTER_SLICE,
  },
});

export default store;
