import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  wishlist: [],
  wishlistDetailed: [],
  loading: false,
  error: false,
};

const addWishlistSuccess = (state, action) => {
  return updateObject(state, { wishlist: state.wishlist.concat(action.product) });
};

const addWishlistFail = (state, action) => {
  return updateObject(state, { error: true });
};

const removeWishlistSuccess = (state, action) => {
  let updatedWishlist = [];

  state.wishlist.forEach((product) => {
    if (product.id !== action.productId) {
      updatedWishlist.push(product);
    }
  });

  return updateObject(state, { wishlist: updatedWishlist });
};

const removeWishlistFail = (state, action) => {
  return updateObject(state, { error: true });
};

const fetchWishlistStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchWishlistSuccess = (state, action) => {
  let updatedWishlist = [];

  Object.keys(action.wishlist).forEach((wishlist) => {
    updatedWishlist.push(action.wishlist[wishlist]);
  });

  return updateObject(state, {
    loading: false,
    wishlist: updatedWishlist,
  });
};

const fetchWishlistFail = (state, action) => {
  return updateObject(state, { loading: false, error: true });
};

const loadWishlistStart = (state, action) => {
  return updateObject(state, { loading: true, wishlistDetailed: [] });
};

const loadWishlistSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    wishlistDetailed: state.wishlistDetailed.concat(action.product),
  });
};

const loadWishlistFail = (state, action) => {
  return updateObject(state, { error: true, loading: false });
};

const clearWishlistStart = (state, action) => {
  return updateObject(state, {});
};

const clearWishlistSuccess = (state, action) => {
  console.log('clearwishlist');
  return updateObject(state, {
    wishlist: [],
    wishlistDetailed: [],
  });
};

const clearWishlistFail = (state, action) => {
  return updateObject(state, {});
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.ADD_WISHLIST_SUCCESS) {
    return addWishlistSuccess(state, action);
  }

  if (action.type === actionTypes.ADD_WISHLIST_FAIL) {
    return addWishlistFail(state, action);
  }

  if (action.type === actionTypes.REMOVE_WISHLIST_SUCCESS) {
    return removeWishlistSuccess(state, action);
  }

  if (action.type === actionTypes.REMOVE_WISHLIST_FAIL) {
    return removeWishlistFail(state, action);
  }

  if (action.type === actionTypes.FETCH_WISHLIST_START) {
    return fetchWishlistStart(state, action);
  }

  if (action.type === actionTypes.FETCH_WISHLIST_SUCCESS) {
    return fetchWishlistSuccess(state, action);
  }

  if (action.type === actionTypes.FETCH_WISHLIST_FAIL) {
    return fetchWishlistFail(state, action);
  }

  if (action.type === actionTypes.LOAD_WISHLIST_START) {
    return loadWishlistStart(state, action);
  }

  if (action.type === actionTypes.LOAD_WISHLIST_SUCCESS) {
    return loadWishlistSuccess(state, action);
  }

  if (action.type === actionTypes.LOAD_WISHLIST_FAIL) {
    return loadWishlistFail(state, action);
  }

  if (action.type === actionTypes.CLEAR_WISHLIST_START) {
    return clearWishlistStart(state, action);
  }

  if (action.type === actionTypes.CLEAR_WISHLIST_SUCCESS) {
    return clearWishlistSuccess(state, action);
  }

  if (action.type === actionTypes.CLEAR_WISHLIST_FAIL) {
    return clearWishlistFail(state, action);
  }

  return state;
};

export default reducer;
