import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_PROFILE,
  CUSTOMER_USER_ID,
  CLEAR_ERROR,
} from '../constants/userConstants';

const initialValue = {
  user: null,
};

//USER REGISTER REDUCER
export const loaduserReducer = (state = initialValue, action) => {
  switch (action.type) {
    case LOAD_USER_PROFILE:
      return {
        user: action.payload,
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

//USER REGISTER REDUCER
export const authReducer = (state = initialValue, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REGISTER_USER_FAIL:
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

//ADD UNVERIFIED OR GUEST USER
export const customerReducer = (state = { userId: null }, action) => {
  switch (action.type) {
    case CUSTOMER_USER_ID:
      return {
        userId: action.payload,
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
