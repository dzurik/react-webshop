import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  list: [],
  length: null,
  listLoading: false,
  product: null,
  listError: false,
  productLoading: false,
  productError: false,
};

const fetchProductsStart = (state, action) => {
  return updateObject(state, {
    listLoading: true,
  });
};

const setProducts = (state, action) => {
  return updateObject(state, {
    list: action.list,
    length: action.list.length,
    listLoading: false,
  });
};

const fetchProductsFail = (state, action) => {
  return updateObject(state, {
    listLoading: false,
    listError: true,
  });
};

const fetchSingleProductStart = (state, action) => {
  return updateObject(state, {
    productLoading: true,
    product: null,
  });
};

const fetchSingleProductSuccess = (state, action) => {
  return updateObject(state, {
    productLoading: false,
    product: action.product,
  });
};

const fetchSingleProductFail = (state, action) => {
  return updateObject(state, {
    productLoading: false,
    productError: true,
    product: null,
  });
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.FETCH_PRODUCTS_START) {
    return fetchProductsStart(state, action);
  }

  if (action.type === actionTypes.FETCH_PRODUCTS_SUCCESS) {
    return setProducts(state, action);
  }

  if (action.type === actionTypes.FETCH_PRODUCTS_FAIL) {
    return fetchProductsFail(state, action);
  }

  if (action.type === actionTypes.FETCH_SINGLE_PRODUCT_START) {
    return fetchSingleProductStart(state, action);
  }

  if (action.type === actionTypes.FETCH_SINGLE_PRODUCT_SUCCESS) {
    return fetchSingleProductSuccess(state, action);
  }

  if (action.type === actionTypes.FETCH_SINGLE_PRODUCT_FAIL) {
    return fetchSingleProductFail(state, action);
  }

  return state;
};

export default reducer;
