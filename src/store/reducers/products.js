import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  list: [],
  length: null,
  listLoading: false,
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

  return state;
};

export default reducer;
