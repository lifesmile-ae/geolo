import {
  SHOW_CART_SIDEBAR,
  HIDE_CART_SIDEBAR,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_REMOVE_QTY,
  CART_ADD_QTY,
  ALL_CART_EMPTY,
  SET_CART_VALUE,
  REMOVE_CART_VALUE,
} from '../constants/cartConstants';

export const setcartSidebar = (
  state = {
    cart: 'hidden',
  },
  action
) => {
  switch (action.type) {
    case SHOW_CART_SIDEBAR:
      return {
        cart: 'show',
      };
    case HIDE_CART_SIDEBAR:
      return {
        cart: 'hidden',
      };
    default:
      return state;
  }
};

const initialState = {
  cart: {
    cartItems: [],
  },
};

export const setcartadditems = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.productCode === newItem.productCode
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    case CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.productCode !== action.payload
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case CART_ADD_QTY: {
      const initial = state.cart.cartItems.filter(
        (item) => item.productCode == action.payload
      );
      const increament = initial[0].productQuantity + 1;
      const updated = [{ ...initial[0], productQuantity: increament }];

      const removed = state.cart.cartItems.filter(
        (item) => item.productCode != action.payload
      );

      const cartItems = [...removed, ...updated];
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case CART_REMOVE_QTY: {
      const initial = state.cart.cartItems.filter(
        (item) => item.productCode == action.payload
      );
      let increament = initial[0].productQuantity - 1;
      if (increament == 0) {
        increament = 1;
      }
      const updated = [{ ...initial[0], productQuantity: increament }];

      const removed = state.cart.cartItems.filter(
        (item) => item.productCode != action.payload
      );

      const cartItems = [...removed, ...updated];
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case ALL_CART_EMPTY: {
      const cartItems = [];
      return { ...state, cart: { cartItems } };
    }
    default:
      return state;
  }
};

const initial = [];

export const setcartvalue = (state = initial, action) => {
  switch (action.type) {
    case SET_CART_VALUE:
      return { ...state, cart: { ...state.cart, cartValue: action.payload } };
    case REMOVE_CART_VALUE:
      return { ...state, cart: { ...state.cart, cartValue: initial } };
    default:
      return state;
  }
};
