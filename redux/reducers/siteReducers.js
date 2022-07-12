import {
  SHOW_MOBILE_SIDEBAR,
  HIDE_MOBILE_SIDEBAR,
  SITE_CURRENCY_AED,
  SITE_CURRENCY_USD,
  IS_SHIPPING,
  NOT_SHIPPING,
} from '../constants/siteConstants';

export const showMobilesSidebar = (state = false, action) => {
  switch (action.type) {
    case SHOW_MOBILE_SIDEBAR:
      return {
        show: true,
      };
    case HIDE_MOBILE_SIDEBAR:
      return {
        show: false,
      };
    default:
      return state;
  }
};

const initialCurrency = {
  currency: 'AED',
};

export const setsiteCurrency = (state = initialCurrency, action) => {
  switch (action.type) {
    case SITE_CURRENCY_AED:
      return {
        currency: 'AED',
      };
    case SITE_CURRENCY_USD:
      return {
        currency: '$',
      };
    default:
      return state;
  }
};

const initailloggedin = {
  loggedin: false,
  shipping: false,
};

export const isloggedin = (state = initailloggedin, action) => {
  switch (action.type) {
    case IS_SHIPPING:
      return {
        ...state,
        shipping: true,
      };
    case NOT_SHIPPING:
      return {
        ...state,
        shipping: false,
      };
    default:
      return state;
  }
};
