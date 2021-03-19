import axios from '../../axios-firebase';
import * as actionTypes from './actionTypes';

const fetchProductsStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START,
  };
};

const setProducts = (list) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    list: list,
  };
};

const fetchProductsFail = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAIL,
  };
};

export const fetchProducts = (phones) => {
  return (dispatch) => {
    dispatch(fetchProductsStart());
    axios
      .get(`products/${phones}.json`)
      .then((response) => {
        const fetchedProducts = [];
        for (let key in response.data) {
          fetchedProducts.push({ ...response.data[key], id: key });
        }

        dispatch(setProducts(fetchedProducts));
      })
      .catch((error) => dispatch(fetchProductsFail()));
  };
};
