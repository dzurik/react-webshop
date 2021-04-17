import * as actionTypes from './actionTypes';
import axios from '../../axios-firebase';
import { updateObject } from '../../shared/utility';

// CLEAR ADDEDPRODUCT

export const clearAddedProduct = () => {
  return {
    type: actionTypes.CLEAR_ADDED_PRODUCT,
  };
};

// ADD TO CART

const addToCartStart = () => {
  return {
    type: actionTypes.ADD_TO_CART_START,
  };
};

const addToCartSuccess = (product, cart) => {
  return {
    type: actionTypes.ADD_TO_CART_SUCCESS,
    product: product,
    cart: cart,
  };
};

const addToCartFail = () => {
  return {
    type: actionTypes.ADD_TO_CART_FAIL,
  };
};

export const addToCart = (userId, productId, productType, addedFromCart) => {
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

    const cart = getState().cart.cart;
    if (userId) {
      if (cart.length === 0) {
        axios
          .put(`/users/${userId}/cart/${transactionId}.json`, product)
          .then((response) => dispatch(addToCartSuccess(product)))
          .catch((error) => dispatch(addToCartFail()));
      } else {
        let updatedProduct;
        let cartContain = [];
        cartContain = cart.map((item) => {
          if (item.id === productId) {
            updatedProduct = updateObject(item, { quantity: item.quantity + 1 });

            return 'quantityUpdate';
          }

          return 'newProduct';
        });

        if (cartContain.includes('quantityUpdate')) {
          axios
            .patch(
              `/users/${userId}/cart/${updatedProduct.transactionId}.json`,
              updatedProduct
            )
            .then((response) => dispatch(addToCartSuccess(updatedProduct, addedFromCart)))
            .catch((error) => dispatch(addToCartFail()));
        } else {
          axios
            .put(`/users/${userId}/cart/${transactionId}.json`, product)
            .then((response) => dispatch(addToCartSuccess(product, addedFromCart)))
            .catch((error) => dispatch(addToCartFail()));
        }
      }
    } else {
      if (cart.length === 0) {
        dispatch(addToCartSuccess(product));
      } else {
        let updatedProduct;
        let cartContain = [];
        cartContain = cart.map((item) => {
          if (item.id === productId) {
            updatedProduct = updateObject(item, { quantity: item.quantity + 1 });

            return 'quantityUpdate';
          }

          return 'newProduct';
        });

        if (cartContain.includes('quantityUpdate')) {
          dispatch(addToCartSuccess(updatedProduct, addedFromCart));
        } else {
          dispatch(addToCartSuccess(product, addedFromCart));
        }
      }
    }
  };
};

// REMOVE FROM CART

const removeFromCartStart = () => {
  return {
    type: actionTypes.REMOVE_FROM_CART_START,
  };
};

const removeFromCartSuccess = (updatedItem, productId) => {
  return {
    type: actionTypes.REMOVE_FROM_CART_SUCCESS,
    productId: productId,
    updatedItem: updatedItem,
  };
};

const removeFromCartFail = () => {
  return {
    type: actionTypes.REMOVE_FROM_CART_FAIL,
  };
};

export const removeFromCart = (userId, productId, cart) => {
  return (dispatch, getState) => {
    let filteredItem = cart.find((item) => item.id === productId);

    dispatch(removeFromCartStart());

    let updatedItem = updateObject(filteredItem, {
      quantity: filteredItem.quantity - 1,
    });

    if (userId) {
      axios
        .put(`/users/${userId}/cart/${filteredItem.transactionId}.json`, updatedItem)
        .then((response) => dispatch(removeFromCartSuccess(updatedItem, productId)))
        .catch((error) => dispatch(removeFromCartFail()));
    } else {
      dispatch(removeFromCartSuccess(updatedItem, productId));
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
    let deletableItem = cart.find((item) => item.id === productId);
    dispatch(removeFullItemFromCartStart());

    if (userId) {
      axios
        .delete(`/users/${userId}/cart/${deletableItem.transactionId}.json`)
        .then((response) =>
          dispatch(removeFullItemFromCartSuccess(updatedCart, productId))
        )
        .catch((error) => dispatch(removeFullItemFromCartFail()));
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

// LOAD CART

const loadCartStart = () => {
  return {
    type: actionTypes.LOAD_CART_START,
  };
};

const loadCartSuccess = (product, quantity) => {
  return {
    type: actionTypes.LOAD_CART_SUCCESS,
    product: product,
    quantity: quantity,
  };
};

const loadCartFail = () => {
  return {
    type: actionTypes.LOAD_CART_FAIL,
  };
};

export const loadCart = (cart) => {
  return (dispatch) => {
    dispatch(loadCartStart());

    const localStorageCart = JSON.parse(localStorage.getItem('cart'));
    if (!localStorageCart) dispatch(clearCart());

    if (localStorageCart || (cart && cart.length === localStorageCart.length)) {
      cart.forEach((item) => {
        axios
          .get(`products/${item.type}/${item.id}.json`)
          .then((response) => {
            dispatch(loadCartSuccess(response.data, item.quantity));
          })
          .catch((error) => dispatch(loadCartFail()));
      });
    } else {
      dispatch(loadCartSuccess());
    }
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
                type: response.data[product].type,
                id: response.data[product].id,
                transactionId: response.data[product].transactionId,
                quantity: response.data[product].quantity,
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
          id: product.id,
          quantity: product.quantity,
          transactionId: product.transactionId,
          type: product.type,
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
