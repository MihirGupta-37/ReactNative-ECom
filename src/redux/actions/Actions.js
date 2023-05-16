import {
  ADD_TO_CART,
  CALCULATE_TOTAL,
  DELETE_CART,
  REMOVE_FROM_CART,
} from '../ActionTypes';

export const addItemtoCart = product => ({
  type: ADD_TO_CART,
  payload: product,
});

export const deleteCart = product => ({
  type: DELETE_CART,
  payload: product,
});

export const removeFromCart = product => ({
  type: REMOVE_FROM_CART,
  payload: product,
});

export const calculateTotal = product => ({
  type: CALCULATE_TOTAL,
  payload: product,
});
