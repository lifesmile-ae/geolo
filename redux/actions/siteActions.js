import {
  SHOW_MOBILE_SIDEBAR,
  HIDE_MOBILE_SIDEBAR,
  SITE_CURRENCY_AED,
  SITE_CURRENCY_USD,
  IS_SHIPPING,
  NOT_SHIPPING,
} from '../constants/siteConstants';

export const showmobilesidebar = () => async (dispatch) => {
  dispatch({
    type: SHOW_MOBILE_SIDEBAR,
  });
};

export const hidemobilesidebar = () => async (dispatch) => {
  dispatch({
    type: HIDE_MOBILE_SIDEBAR,
  });
};

export const sitecurrencyaed = () => async (dispatch) => {
  dispatch({
    type: SITE_CURRENCY_AED,
  });
};

export const sitecurrencyusd = () => async (dispatch) => {
  dispatch({
    type: SITE_CURRENCY_USD,
  });
};

export const shipavailable = () => async (dispatch) => {
  dispatch({
    type: IS_SHIPPING,
  });
};

export const notshipavailable = () => async (dispatch) => {
  dispatch({
    type: NOT_SHIPPING,
  });
};
