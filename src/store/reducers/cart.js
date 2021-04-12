import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  cart: [],
  shallowCart: [],
  fullDetailedCart: null,
  loading: false,
  error: false,
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
  return updateObject(state, {
    addedProduct: action.product,
    cart: state.cart.concat(action.product),
  });
};

const addToCartFail = (state, action) => {
  return updateObject(state, {});
};

// REMOVE FROM CART

const removeFromCartStart = (state, action) => {
  return updateObject(state, {});
};

const removeFromCartSuccess = (state, action) => {
  let updatedCart = [];

  state.cart.forEach((item) => {
    if (item.transactionId !== action.transactionId) {
      updatedCart.push(item);
    }
  });

  if (updatedCart.length === 0) {
    return updateObject(state, {});
  }

  return updateObject(state, { cart: updatedCart });
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

// LOAD SHALLOW CART

const loadShallowCartStart = (state, action) => {
  return updateObject(state, { loading: true, error: false });
};

const loadShallowCartSuccess = (state, action) => {
  if (!action.item)
    return updateObject(state, {
      loading: false,
    });
  const updatedItem = updateObject(action.item, { transactionId: action.transactionId });

  return updateObject(state, {
    loading: false,
    shallowCart: state.shallowCart.concat(updatedItem),
  });
};

const loadShallowCartFail = (state, action) => {
  return updateObject(state, { error: true });
};

const loadCartSuccess = (state, action) => {
  let updatedCart = [];

  action.cart.forEach((item) => {
    let newProduct = true;
    let updatedItem = updateObject(item, { quantity: 1 });
    if (!updatedCart.length) {
      updatedCart.push(updatedItem);
    } else {
      let newCart = updatedCart.map((product) => {
        if (product.id !== item.id) {
          return product;
        } else {
          newProduct = false;
          return updateObject(product, { quantity: product.quantity + 1 });
        }
      });

      if (newProduct) {
        newCart.push(updatedItem);
      }

      updatedCart = newCart;
    }
  });

  return updateObject(state, {
    loading: false,
    fullDetailedCart: updatedCart,
    shallowCart: [],
  });
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
  return updateObject(state, { cart: state.cart.concat(action.cart) });
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

  if (action.type === actionTypes.LOAD_SHALLOW_CART_START) {
    return loadShallowCartStart(state, action);
  }

  if (action.type === actionTypes.LOAD_SHALLOW_CART_SUCCESS) {
    return loadShallowCartSuccess(state, action);
  }

  if (action.type === actionTypes.LOAD_SHALLOW_CART_FAIL) {
    return loadShallowCartFail(state, action);
  }

  if (action.type === actionTypes.LOAD_CART_SUCCESS) {
    return loadCartSuccess(state, action);
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
