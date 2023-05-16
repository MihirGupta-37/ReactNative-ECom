import {ADD_TO_CART, REMOVE_FROM_CART} from '../ActionTypes';

const reducers = (initialState = [], action) => {
  switch (action) {
    case ADD_TO_CART:
      return [...initialState, ...action.payload];
    case REMOVE_FROM_CART:
      const deletedArray = initialState.filter((item, index) => {
        return index !== action.payload;
      });
      return deletedArray;
  }
};
