import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  cart: [],
  loadCart: null,
  fullDetailedCart: [],
  loading: false,
  error: false,
  errorMessage: null,
  addedProduct: null,
};

// CLEAR ADDEDPRODUCT

const clearAddedProduct = (state, action) => {
  return updateObject(state, {
    addedProduct: null,
  });
};

// ADD TO CART

const addToCartStart = (state, action) => {
  return updateObject(state, {});
};

const addToCartSuccess = (state, action) => {
  let updatedCart = state.cart.slice();
  let updateProduct;

  if (updatedCart.length) {
    updatedCart = updatedCart.map((product) => {
      if (product.transactionId !== action.product.transactionId) {
        return product;
      }

      updateProduct = true;

      return action.product;
    });
  }

  if (updateProduct) {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return updateObject(state, {
      cart: updatedCart,
      addedProduct: action.cart ? null : action.product,
      loadCart: true,
    });
  }

  localStorage.setItem('cart', JSON.stringify(state.cart.concat(action.product)));

  return updateObject(state, {
    cart: state.cart.concat(action.product),
    addedProduct: action.cart ? null : action.product,
    loadCart: true,
  });
};

const addToCartFail = (state, action) => {
  return updateObject(state, {
    error: true,
    errorMessage: 'Failed to add an item to cart',
  });
};

// REMOVE FROM CART

const removeFromCartStart = (state, action) => {
  return updateObject(state, {});
};

const removeFromCartSuccess = (state, action) => {
  let updatedCart = state.cart.slice();

  if (updatedCart.length === 0) {
    return updateObject(state, {});
  }

  updatedCart = updatedCart.map((item) => {
    if (item.transactionId !== action.updatedItem.transactionId) {
      return item;
    }

    return action.updatedItem;
  });

  return updateObject(state, { cart: updatedCart, loadCart: true });
};

const removeFromCartFail = (state, action) => {
  return updateObject(state, { error: true });
};

// REMOVE FULL ITEM FROM CART

const removeFullItemFromCartStart = (state, action) => {
  return updateObject(state, {});
};

const removeFullItemFromCartSuccess = (state, action) => {
  let updatedFullCart = [];

  state.fullDetailedCart.forEach((item) => {
    if (item.id !== action.productId) {
      updatedFullCart.push(item);
    }
  });

  return updateObject(state, {
    cart: action.updatedCart,
    fullDetailedCart: updatedFullCart,
  });
};

const removeFullItemFromCartFail = (state, action) => {
  return updateObject(state, { error: true });
};

const loadCartStart = (state, action) => {
  return updateObject(state, { fullDetailedCart: [], loadCart: false });
};

const loadCartSuccess = (state, action) => {
  let updatedProduct = updateObject(action.product, { quantity: action.quantity });

  if (!action.product) {
    return updateObject(state, {});
  }

  return updateObject(state, {
    fullDetailedCart: state.fullDetailedCart.concat(updatedProduct),
  });
};

const loadCartFail = (state, action) => {
  return updateObject(state, {});
};

// CLEAR CART

const clearCartStart = (state, action) => {
  return updateObject(state, {});
};

const clearCartSuccess = (state, action) => {
  localStorage.removeItem('cart');
  return updateObject(state, {
    cart: [],
    fullDetailedCart: [],
  });
};

const clearCartFail = (state, action) => {
  return updateObject(state, {});
};

// FETCH CART

const fetchCartStart = (state, action) => {
  return updateObject(state, { cart: action.cart });
};

const fetchCartSuccess = (state, action) => {
  return updateObject(state, { cart: state.cart.concat(action.cart), loadCart: true });
};

const fetchCartFail = (state, action) => {
  return updateObject(state, {});
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.ADD_TO_CART_START) {
    return addToCartStart(state, action);
  }

  if (action.type === actionTypes.ADD_TO_CART_SUCCESS) {
    return addToCartSuccess(state, action);
  }

  if (action.type === actionTypes.ADD_TO_CART_FAIL) {
    return addToCartFail(state, action);
  }

  if (action.type === actionTypes.REMOVE_FROM_CART_START) {
    return removeFromCartStart(state, action);
  }

  if (action.type === actionTypes.REMOVE_FROM_CART_SUCCESS) {
    return removeFromCartSuccess(state, action);
  }

  if (action.type === actionTypes.REMOVE_FROM_CART_FAIL) {
    return removeFromCartFail(state, action);
  }

  if (action.type === actionTypes.REMOVE_FULL_ITEM_FROM_CART_START) {
    return removeFullItemFromCartStart(state, action);
  }

  if (action.type === actionTypes.REMOVE_FULL_ITEM_FROM_CART_SUCCESS) {
    return removeFullItemFromCartSuccess(state, action);
  }

  if (action.type === actionTypes.REMOVE_FULL_ITEM_FROM_CART_FAIL) {
    return removeFullItemFromCartFail(state, action);
  }

  if (action.type === actionTypes.FETCH_CART_START) {
    return fetchCartStart(state, action);
  }

  if (action.type === actionTypes.FETCH_CART_SUCCESS) {
    return fetchCartSuccess(state, action);
  }

  if (action.type === actionTypes.FETCH_CART_FAIL) {
    return fetchCartFail(state, action);
  }

  if (action.type === actionTypes.LOAD_CART_START) {
    return loadCartStart(state, action);
  }

  if (action.type === actionTypes.LOAD_CART_SUCCESS) {
    return loadCartSuccess(state, action);
  }

  if (action.type === actionTypes.LOAD_CART_FAIL) {
    return loadCartFail(state, action);
  }

  if (action.type === actionTypes.CLEAR_CART_START) {
    return clearCartStart(state, action);
  }

  if (action.type === actionTypes.CLEAR_CART_SUCCESS) {
    return clearCartSuccess(state, action);
  }

  if (action.type === actionTypes.CLEAR_CART_FAIL) {
    return clearCartFail(state, action);
  }

  if (action.type === actionTypes.CLEAR_ADDED_PRODUCT) {
    return clearAddedProduct(state, action);
  }

  return state;
};

export default reducer;
