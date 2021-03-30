import axios from '../../axios-firebase';
import * as actionTypes from './actionTypes';

const addProductStart = () => {
  return {
    type: actionTypes.ADD_PRODUCT_START,
  };
};
const addProductSuccess = () => {
  return {
    type: actionTypes.ADD_PRODUCT_SUCCESS,
  };
};
const addProductFail = () => {
  return {
    type: actionTypes.ADD_PRODUCT_FAIL,
  };
};

export const addProduct = (productDetails, productType) => {
  const details = {
    id: new Date()
      .toISOString()
      .replaceAll('.', '')
      .replaceAll('-', '')
      .replaceAll(':', ''),
    type: productType,
    details: productDetails,
  };

  return (dispatch) => {
    dispatch(addProductStart());
    axios
      .put(`products/${productType}/${details.id}.json`, details)
      .then((response) => dispatch(addProductSuccess()))
      .catch((err) => dispatch(addProductFail()));
  };
};

export const addNewProduct = () => {
  return {
    type: actionTypes.ADD_NEW_PRODUCT,
  };
};
