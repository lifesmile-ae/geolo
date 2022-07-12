import {
  SHOW_CART_SIDEBAR,
  HIDE_CART_SIDEBAR,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_ADD_QTY,
  CART_REMOVE_QTY,
  ALL_CART_EMPTY,
  SET_CART_VALUE,
  REMOVE_CART_VALUE,
} from '../constants/cartConstants';

export const showcartsidebar = () => async (dispatch) => {
  await dispatch({
    type: SHOW_CART_SIDEBAR,
  });
};

export const hidecartsidebar = () => async (dispatch) => {
  await dispatch({
    type: HIDE_CART_SIDEBAR,
  });
};

export const addcartItem = (cartItem) => async (dispatch) => {
  await dispatch({
    type: CART_ADD_ITEM,
    payload: cartItem,
  });
};

export const removecartItem = (productCode) => async (dispatch) => {
  await dispatch({
    type: CART_REMOVE_ITEM,
    payload: productCode,
  });
};

export const addcartQty = (productCode) => async (dispatch) => {
  await dispatch({
    type: CART_ADD_QTY,
    payload: productCode,
  });
};

export const removecartQty = (productCode) => async (dispatch) => {
  await dispatch({
    type: CART_REMOVE_QTY,
    payload: productCode,
  });
};

export const clearCart = () => async (dispatch) => {
  await dispatch({
    type: ALL_CART_EMPTY,
  });
};

export const cartValue = (cartValue) => async (dispatch) => {
  await dispatch({
    type: SET_CART_VALUE,
    payload: cartValue,
  });
};

export const removeCartValue = () => async (dispatch) => {
  await dispatch({
    type: REMOVE_CART_VALUE,
  });
};
