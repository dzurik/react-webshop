import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  cart: [],
  shallowCart: [],
  fullDetailedCart: null,
  loading: false,
  error: false,
};

const addToCartStart = (state, action) => {
  let addedProduct = {
    type: action.productType,
    id: action.productId,
    quantity: 1,
  };

  return updateObject(state, {
    cart: state.cart.concat(addedProduct),
  });
};

const loadShallowCartStart = (state, action) => {
  return updateObject(state, { loading: true, error: false });
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

const loadCartItem = (state, action) => {
  let updatedItem = updateObject(action.item, { quantity: 1 });

  let newProduct = true;

  if (!state.fullDetailedCart) {
    return updateObject(state, {
      fullDetailedCart: [updatedItem],
    });
  }

  let updatedCart = state.fullDetailedCart.map((product) => {
    if (product.id !== action.item.id) {
      return product;
    }
    newProduct = false;
    return updateObject(product, { quantity: product.quantity + 1 });
  });

  if (newProduct) {
    return updateObject(state, {
      fullDetailedCart: state.fullDetailedCart.concat(updatedItem),
    });
  } else {
    return updateObject(state, { fullDetailedCart: updatedCart });
  }
};

const loadShallowCartSuccess = (state, action) => {
  return updateObject(state, { shallowCart: state.shallowCart.concat(action.item) });
};

const fetchCartStart = (state, action) => {
  return updateObject(state, { cart: action.cart });
};

const fetchCartSuccess = (state, action) => {
  return updateObject(state, { cart: state.cart.concat(action.cart) });
};

const fetchCartFail = (state, action) => {
  return updateObject(state, {});
};

const clearCartStart = (state, action) => {
  localStorage.removeItem('cart');
  return updateObject(state, {
    cart: [],
    fullDetailedCart: [],
  });
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.ADD_TO_CART_START) {
    return addToCartStart(state, action);
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

  if (action.type === actionTypes.LOAD_SHALLOW_CART) {
    return loadShallowCartSuccess(state, action);
  }

  if (action.type === actionTypes.LOAD_SHALLOW_CART_START) {
    return loadShallowCartStart(state, action);
  }

  if (action.type === actionTypes.LOAD_CART_SUCCESS) {
    return loadCartSuccess(state, action);
  }

  if (action.type === actionTypes.LOAD_CART_ITEM) {
    return loadCartItem(state, action);
  }

  if (action.type === actionTypes.CLEAR_CART_START) {
    return clearCartStart(state, action);
  }

  return state;
};

export default reducer;
