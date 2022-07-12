import {
  WISH_ADD_ITEM,
  WISH_REMOVE_ITEM,
  ALL_WISH_EMPTY,
} from '../constants/wishConstants';

const initialState = {
  wishList: {
    wishItems: [],
  },
};

export const setwishListitems = (state = initialState, action) => {
  switch (action.type) {
    case WISH_ADD_ITEM:
      const newItem = action.payload;
      const existItem = state.wishList.wishItems.find(
        (item) => item.id === newItem.id
      );
      const wishItems = existItem
        ? state.wishList.wishItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.wishList.wishItems, newItem];
      return { ...state, wishList: { ...state.wishList, wishItems } };
    case WISH_REMOVE_ITEM: {
      const wishItems = state.wishList.wishItems.filter(
        (item) => item.id !== action.payload
      );
      return { ...state, wishList: { ...state.wishList, wishItems } };
    }
    case ALL_WISH_EMPTY: {
      const cartItems = [];
      return { ...state, cart: { cartItems } };
    }
    default:
      return state;
  }
};
