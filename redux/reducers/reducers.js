import { combineReducers } from 'redux';

import { showMobilesSidebar, setsiteCurrency } from './siteReducers';

import {
  getAllCategory,
  addNewCategory,
  updateNewCategory,
} from './categoryReducers';

import { setcartSidebar, setcartadditems, setcartvalue } from './cartReducers';

import { authReducer, loaduserReducer, customerReducer } from './userReducers';

import { setwishListitems } from './wishReducers';

const reducer = combineReducers({
  mobilesidebar: showMobilesSidebar,
  allcategory: getAllCategory,
  addNewCategory: addNewCategory,
  updateCategory: updateNewCategory,
  siteCurrency: setsiteCurrency,
  cartSidebar: setcartSidebar,
  addcartItem: setcartadditems,
  auth: authReducer,
  loaduser: loaduserReducer,
  wishListItems: setwishListitems,
  customer: customerReducer,
  cartValue: setcartvalue,
});

export default reducer;
