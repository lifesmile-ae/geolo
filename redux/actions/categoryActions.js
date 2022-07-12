import axios from 'axios';

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
  CLEAR_ERROR,
} from '../constants/categoryConstants';

export const getCategory = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_REQUEST });
    let link = `/api/category/`;

    const { data } = await axios.get(link);
    dispatch({
      type: GET_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addCategory = (form) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CATEGORY_REQUEST });
    let link = `/api/category/create`;
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const { data } = await axios.post(link, form, config);
    dispatch({
      type: ADD_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_CATEGORY_FAIL,
      payload: error.response.data,
    });
  }
};

export const updateCategory = (form, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    let link = `/api/category/${id}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(link, form, config);
    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error.response.data,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
