import {
  WISH_ADD_ITEM,
  WISH_REMOVE_ITEM,
  ALL_WISH_EMPTY,
} from '../constants/wishConstants';

export const addwishItem = (wishItem) => async (dispatch) => {
  await dispatch({
    type: WISH_ADD_ITEM,
    payload: wishItem,
  });
};

export const removewishItem = (productCode) => async (dispatch) => {
  await dispatch({
    type: WISH_REMOVE_ITEM,
    payload: productCode,
  });
};

export const clearWishList = () => async (dispatch) => {
  await dispatch({
    type: ALL_WISH_EMPTY,
  });
};
