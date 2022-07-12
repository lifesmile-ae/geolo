import {
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_RESET,
  CLEAR_ERROR,
} from '../constants/categoryConstants';

export const getAllCategory = (state = '', action) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        loading: false,
        category: action.payload,
      };
    case GET_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const addNewCategory = (state = '', action) => {
  switch (action.type) {
    case ADD_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case ADD_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const updateNewCategory = (state = '', action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case UPDATE_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_CATEGORY_RESET:
      return {
        success: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
