import axios from '../../axios-firebase';
import * as actionTypes from './actionTypes';

const addWishlistSuccess = (product) => {
  return {
    type: actionTypes.ADD_WISHLIST_SUCCESS,
    product: product,
  };
};

const addWishlistFail = () => {
  return {
    type: actionTypes.ADD_WISHLIST_FAIL,
  };
};

export const addWishlist = (token, userId, productId, productType) => {
  let product = {
    id: productId,
    type: productType,
  };

  return (dispatch, getState) => {
    if (token) {
      axios
        .put(`users/${userId}/wishlist/${productId}.json`, product)
        .then((response) => {
          dispatch(addWishlistSuccess(product));
        })
        .catch((error) => {
          dispatch(addWishlistFail());
        });
    }
  };
};

const removeWishlistSuccess = (productId) => {
  return {
    type: actionTypes.REMOVE_WISHLIST_SUCCESS,
    productId: productId,
  };
};

const removeWishlistFail = () => {
  return {
    type: actionTypes.REMOVE_WISHLIST_FAIL,
  };
};

export const removeWishlist = (token, userId, productId) => {
  return (dispatch, getState) => {
    if (token) {
      axios
        .delete(`users/${userId}/wishlist/${productId}.json`)
        .then((response) => {
          dispatch(removeWishlistSuccess(productId));
        })
        .catch((error) => {
          dispatch(removeWishlistFail());
        });
    }
  };
};

const fetchWishlistStart = () => {
  return {
    type: actionTypes.FETCH_WISHLIST_START,
  };
};

const fetchWishlistSuccess = (wishlist) => {
  return {
    type: actionTypes.FETCH_WISHLIST_SUCCESS,
    wishlist: wishlist,
  };
};

const fetchWishlistFail = () => {
  return {
    type: actionTypes.FETCH_WISHLIST_FAIL,
  };
};

export const fetchWishlist = (userId) => {
  return (dispatch) => {
    dispatch(fetchWishlistStart());
    axios
      .get(`users/${userId}/wishlist.json`)
      .then((response) => {
        dispatch(fetchWishlistSuccess(response.data));
      })
      .catch((err) => {
        dispatch(fetchWishlistFail());
      });
  };
};
