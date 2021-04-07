import * as actionTypes from './actionTypes';
import axios from '../../axios-firebase';
// import { updateObject } from '../../shared/utility';

// ADD TO CART

const addToCartStart = () => {
  return {
    type: actionTypes.ADD_TO_CART_START,
  };
};

const addToCartSuccess = (product) => {
  return {
    type: actionTypes.ADD_TO_CART_SUCCESS,
    product: product,
  };
};

const addToCartFail = () => {
  return {
    type: actionTypes.ADD_TO_CART_FAIL,
  };
};

export const addToCart = (userId, productId, productType) => {
  const transactionId = new Date()
    .toISOString()
    .replaceAll('.', '')
    .replaceAll('-', '')
    .replaceAll(':', '');

  let product = {
    transactionId: transactionId,
    type: productType,
    id: productId,
    quantity: 1,
  };

  return (dispatch, getState) => {
    dispatch(addToCartStart());

    if (userId) {
      axios
        .put(`/users/${userId}/cart/${transactionId}.json`, product)
        .then((response) => dispatch(addToCartSuccess(product)))
        .catch((error) => dispatch(addToCartFail()));
    } else {
      dispatch(addToCartSuccess(product));
    }
    const cart = getState().cart.cart;
    localStorage.setItem('cart', JSON.stringify(cart));
  };
};

// REMOVE FROM CART

const removeFromCartStart = () => {
  return {
    type: actionTypes.REMOVE_FROM_CART_START,
  };
};

const removeFromCartSuccess = (transactionId, productId) => {
  return {
    type: actionTypes.REMOVE_FROM_CART_SUCCESS,
    productId: productId,
    transactionId: transactionId,
  };
};

const removeFromCartFail = () => {
  return {
    type: actionTypes.REMOVE_FROM_CART_FAIL,
  };
};

export const removeFromCart = (userId, productId, cart) => {
  return (dispatch, getState) => {
    let filteredItems = cart.filter((item) => item.id === productId);

    dispatch(removeFromCartStart());

    if (userId) {
      axios
        .delete(`/users/${userId}/cart/${filteredItems[0].transactionId}.json`)
        .then((response) =>
          dispatch(removeFromCartSuccess(filteredItems[0].transactionId, productId))
        )
        .catch((error) => dispatch(removeFromCartFail()));
    } else {
      dispatch(removeFromCartSuccess(filteredItems[0].transactionId, productId));
    }
    const updatedCart = getState().cart.cart;

    if (updatedCart.length === 0) {
      localStorage.removeItem('cart');
    } else {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };
};

// REMOVE FULL ITEM FROM CART

export const removeFullItemFromCartStart = () => {
  return {
    type: actionTypes.REMOVE_FULL_ITEM_FROM_CART_START,
  };
};

export const removeFullItemFromCartSuccess = (updatedCart, productId) => {
  return {
    type: actionTypes.REMOVE_FULL_ITEM_FROM_CART_SUCCESS,
    updatedCart: updatedCart,
    productId: productId,
  };
};

export const removeFullItemFromCartFail = () => {
  return {
    type: actionTypes.REMOVE_FULL_ITEM_FROM_CART_FAIL,
  };
};

export const removeFullItemFromCart = (userId, productId, cart) => {
  return (dispatch, getState) => {
    let updatedCart = cart.filter((item) => item.id !== productId);
    let deletableItems = cart.filter((item) => item.id === productId);
    dispatch(removeFullItemFromCartStart());

    if (userId) {
      deletableItems.forEach((item) => {
        axios
          .delete(`/users/${userId}/cart/${item.transactionId}.json`)
          .then((response) =>
            dispatch(removeFullItemFromCartSuccess(updatedCart, productId))
          )
          .catch((error) => dispatch(removeFullItemFromCartFail()));
      });
    } else {
      dispatch(removeFullItemFromCartSuccess(updatedCart, productId));
    }

    const removedCart = getState().cart.cart;

    if (updatedCart.length === 0) {
      localStorage.removeItem('cart');
    } else {
      localStorage.setItem('cart', JSON.stringify(removedCart));
    }
  };
};

// CLEAR CART

const clearCartStart = () => {
  return {
    type: actionTypes.CLEAR_CART_START,
  };
};

const clearCartSuccess = () => {
  return {
    type: actionTypes.CLEAR_CART_SUCCESS,
  };
};

const clearCartFail = () => {
  return {
    type: actionTypes.CLEAR_CART_FAIL,
  };
};

export const clearCart = (token, userId) => {
  return (dispatch) => {
    dispatch(clearCartStart());
    if (token) {
      axios
        .delete(`/users/${userId}/cart.json?auth=${token}`)
        .then((response) => dispatch(clearCartSuccess()))
        .catch((error) => dispatch(clearCartFail));
    } else {
      dispatch(clearCartSuccess());
    }
  };
};

// LOAD SHALLOW CART

const loadShallowCartStart = () => {
  return {
    type: actionTypes.LOAD_SHALLOW_CART_START,
  };
};

const loadShallowCartSuccess = (item, transactionId) => {
  return {
    type: actionTypes.LOAD_SHALLOW_CART_SUCCESS,
    item: item,
    transactionId: transactionId,
  };
};

const loadShallowCartFail = () => {
  return {
    type: actionTypes.LOAD_SHALLOW_CART_FAIL,
  };
};

export const loadShallowCart = (cart) => {
  return (dispatch) => {
    dispatch(loadShallowCartStart());

    const localStorageCart = JSON.parse(localStorage.getItem('cart'));
    if (!localStorageCart) dispatch(clearCart());

    if (localStorageCart || cart.length === localStorageCart.length) {
      cart.forEach((item) => {
        axios
          .get(`products/${item.type}/${item.id}.json`)
          .then((response) => {
            dispatch(loadShallowCartSuccess(response.data, item.transactionId));
          })
          .catch((error) => dispatch(loadShallowCartFail()));
      });
    } else {
      dispatch(loadShallowCartSuccess());
    }
  };
};

// LOAD CART

const loadCartSuccess = (cart) => {
  return {
    type: actionTypes.LOAD_CART_SUCCESS,
    cart: cart,
  };
};

export const loadCart = (shallowCart) => {
  return (dispatch) => {
    dispatch(loadCartSuccess(shallowCart));
  };
};

// FETCH CART

const fetchCartStart = (cart) => {
  return {
    type: actionTypes.FETCH_CART_START,
    cart: cart,
  };
};

const fetchCartSuccess = (cart) => {
  return {
    type: actionTypes.FETCH_CART_SUCCESS,
    cart: cart,
  };
};

const fetchCartFail = () => {
  return {
    type: actionTypes.FETCH_CART_FAIL,
  };
};

export const fetchCart = (token) => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) dispatch(fetchCartStart(cart));

    if (token && !cart) {
      axios
        .get(`/users/${userId}/cart.json?auth=${token}`)
        .then((response) => {
          if (!response.data) dispatch(fetchCartSuccess([]));

          if (response.data) {
            let updatedCart = [];

            Object.keys(response.data).forEach((product) => {
              const updatedProduct = {
                type: response.data[product].productType,
                id: response.data[product].productId,
                transactionId: response.data[product].transactionId,
                quantity: 1,
              };
              updatedCart.push(updatedProduct);
            });
            dispatch(fetchCartSuccess(updatedCart));
            localStorage.setItem('cart', JSON.stringify(updatedCart));
          }
        })
        .catch((err) => {
          dispatch(fetchCartFail());
        });
    } else if (token && cart) {
      let updatedCart;

      axios.delete(`/users/${userId}/cart.json?auth=${token}`);

      updatedCart = cart.map((product) => {
        let updatedProduct = {
          productId: product.id,
          productType: product.type,
          transactionId: product.transactionId,
        };

        return updatedProduct;
      });
      setTimeout(() => {
        updatedCart.forEach((product) => {
          axios.put(`/users/${userId}/cart/${product.transactionId}.json`, product);
        });
      }, 100);
    }
  };
};
