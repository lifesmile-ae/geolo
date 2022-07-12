import axios from 'axios';
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  CUSTOMER_USER_ID,
  LOAD_USER_PROFILE,
  CLEAR_ERROR,
} from '../constants/userConstants';

//REGISTER USER ACTIONS
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/auth/register', userData, config);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//LOAD USER PROFILE
export const loaduser = (userData) => async (dispatch) => {
  dispatch({
    type: LOAD_USER_PROFILE,
    payload: userData,
  });
};

//Store Customer UserID
export const storeUserId = (userId) => async (dispatch) => {
  dispatch({
    type: CUSTOMER_USER_ID,
    payload: userId,
  });
};

//Remove Customer UserID
export const removeUserId = () => async (dispatch) => {
  dispatch({
    type: CUSTOMER_USER_ID,
    payload: null,
  });
};

//Clear Error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
