import { combineReducers } from "redux";
import {
  productsListReducer,
  productDetailsReducer,
  createProductReducer,
  updateProductReducer,
  deleteProductReducer,
  changeDeliveryStatusReducer,
  productCategoriesReducer,
  nlpSearchReducer,
} from "./productReducers";

import {
  createCardReducer,
  chargeCardReducer,
  savedCardsListReducer,
  deleteSavedCardReducer,
  updateStripeCardtReducer,
} from "./cardReducers";

import { cartReducer } from "./cartReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userDetailsUpdateReducer,
  deleteUserAccountReducer,
  checkTokenValidationReducer,
  getSingleAddressReducer,
  getAllAddressesOfUserReducer,
  createUserAddressReducer,
  updateUserAddressReducer,
  deleteUserAddressReducer,
  getAllOrdersReducer,
} from "./userReducers";

const allReducers = combineReducers({
  productsListReducer,
  productDetailsReducer,
  createProductReducer,
  updateProductReducer,
  deleteProductReducer,
  productCategoriesReducer,
  nlpSearchReducer,
  createCardReducer,
  chargeCardReducer,
  savedCardsListReducer,
  updateStripeCardtReducer,
  deleteSavedCardReducer,
  userLoginReducer,
  userRegisterReducer,
  getSingleAddressReducer,
  getAllAddressesOfUserReducer,
  createUserAddressReducer,
  updateUserAddressReducer,
  deleteUserAddressReducer,
  getAllOrdersReducer,
  changeDeliveryStatusReducer,
  checkTokenValidationReducer,
  userDetailsReducer,
  userDetailsUpdateReducer,
  deleteUserAccountReducer,
  cartReducer,
});

export default allReducers;
