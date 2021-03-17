import * as actions from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  addLoading: false,
  addSuccess: false,
  addError: false,
};

const addProductStart = (state, action) => {
  return updateObject(state, {
    addLoading: true,
    addSuccess: false,
  });
};

const addProductSuccess = (state, action) => {
  return updateObject(state, {
    addLoading: false,
    addSuccess: true,
  });
};

const addProductFail = (state, action) => {
  return updateObject(state, {
    addLoading: false,
    addError: true,
  });
};

const addNewProduct = (state, action) => {
  return updateObject(state, {
    addSuccess: false,
  });
};

const reducer = (state = initialState, action) => {
  if (action.type === actions.ADD_PRODUCT_START) {
    return addProductStart(state, action);
  }

  if (action.type === actions.ADD_PRODUCT_SUCCESS) {
    return addProductSuccess(state, action);
  }

  if (action.type === actions.ADD_PRODUCT_FAIL) {
    return addProductFail(state, action);
  }

  if (action.type === actions.ADD_NEW_PRODUCT) {
    return addNewProduct(state, action);
  }

  return state;
};

export default reducer;
