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

export const fetchProducts = (product) => {
  return (dispatch) => {
    dispatch(fetchProductsStart());
    axios
      .get(`products/${product}.json`)

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

const fetchSingleProductStart = () => {
  return {
    type: actionTypes.FETCH_SINGLE_PRODUCT_START,
  };
};

const fetchSingleProductSuccess = (product) => {
  return {
    type: actionTypes.FETCH_SINGLE_PRODUCT_SUCCESS,
    product: product,
  };
};

const fetchSingleProductFail = () => {
  return {
    type: actionTypes.FETCH_SINGLE_PRODUCT_FAIL,
  };
};

export const fetchSingleProduct = (id, type) => {
  return (dispatch) => {
    dispatch(fetchSingleProductStart());

    axios
      .get(`products/${type}/${id}.json`)
      .then((response) => dispatch(fetchSingleProductSuccess(response.data)))
      .catch((error) => dispatch(fetchSingleProductFail()));
  };
};
