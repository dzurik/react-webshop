import * as actionTypes from './actionTypes';
import axios from '../../axios-firebase';
// import { updateObject } from '../../shared/utility';

const addToCartStart = (productId, productType) => {
  return {
    type: actionTypes.ADD_TO_CART_START,
    productId: productId,
    productType: productType,
  };
};

// const addToCartSuccess = () => {};

// const addToCartFail = () => {};

export const addToCart = (userId, productId, productType) => {
  let product = {
    productId: productId,
    productType: productType,
  };

  return (dispatch, getState) => {
    dispatch(addToCartStart(productId, productType));
    const cart = getState().cart.cart;

    localStorage.setItem('cart', JSON.stringify(cart));
    if (userId) {
      axios
        .post(`/users/${userId}/cart/.json`, product)
        .then((response) => {})
        .catch((error) => console.log(error));
    }
  };
};

const loadShallowCartStart = () => {
  return {
    type: actionTypes.LOAD_SHALLOW_CART_START,
  };
};

const loadShallowCartSuccess = (item) => {
  return {
    type: actionTypes.LOAD_SHALLOW_CART,
    item: item,
  };
};

const loadCartSuccess = (cart) => {
  return {
    type: actionTypes.LOAD_CART_SUCCESS,
    cart: cart,
  };
};

const loadCartFail = () => {
  return {
    type: actionTypes.LOAD_CART_FAIL,
  };
};

const loadCartItem = (item) => {
  return {
    type: actionTypes.LOAD_CART_ITEM,
    item: item,
  };
};

export const loadCart = (shallowCart) => {
  return (dispatch) => {
    dispatch(loadCartSuccess(shallowCart));
  };
};

export const loadShallowCart = (cart) => {
  return (dispatch) => {
    dispatch(loadShallowCartStart());

    cart.forEach((item) => {
      axios.get(`products/${item.type}/${item.id}.json`).then((response) => {
        dispatch(loadShallowCartSuccess(response.data));
      });
    });
  };
};

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
                quantity: 1,
              };
              updatedCart.push(updatedProduct);
            });
            dispatch(fetchCartSuccess(updatedCart));
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
        };

        return updatedProduct;
      });
      updatedCart.forEach((product) => {
        axios.post(`/users/${userId}/cart/.json`, product);
      });
    } else if (!token) {
      dispatch(clearCart(null, null));
    }
  };
};

const clearCartStart = () => {
  return {
    type: actionTypes.CLEAR_CART_START,
  };
};

export const clearCart = (token, userId) => {
  return (dispatch) => {
    dispatch(clearCartStart());
    if (token) {
      axios.delete(`/users/${userId}/cart.json?auth=${token}`);
    }
  };
};
