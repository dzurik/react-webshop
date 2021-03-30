import axios from 'axios';
import axiosFirebase from '../../axios-firebase';
import * as actionTypes from './actionTypes';

const authStart = (signUp) => {
  return {
    type: actionTypes.AUTH_START,
    signUp: signUp,
  };
};

const authSuccess = (signUp, tokenId, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    signUp: signUp,
    token: tokenId,
    localId: localId,
  };
};

const authFail = (signUp, error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    signUp: signUp,
    errorMessage: error.message,
  };
};

export const authLogout = () => {
  localStorage.removeItem('expiresDate');
  localStorage.removeItem('token');
  localStorage.removeItem('localId');
  localStorage.removeItem('cart');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (email, password, signUp) => {
  const config = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  let url;

  if (signUp === true) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyByXTnLPfYZdrsShd0oilUlRHjiNxcRujk';
  } else {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByXTnLPfYZdrsShd0oilUlRHjiNxcRujk';
  }

  return (dispatch) => {
    dispatch(authStart(signUp));
    axios
      .post(url, config)
      .then((response) => {
        const expireDate = new Date().getTime() / 1000 + +response.data.expiresIn;

        localStorage.setItem('expiresDate', expireDate);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('localId', response.data.localId);
        dispatch(authSuccess(signUp, response.data.idToken, response.data.localId));
        if (signUp) {
          axiosFirebase.put(`users/${response.data.localId}.json`, {
            userName: email.split('@')[0],
            userId: response.data.localId,
          });
        }
      })
      .catch((error) => {
        dispatch(authFail(signUp, error.response.data.error));
      });
  };
};

export const checkAuthStatus = () => {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    if (!token) {
      dispatch(authLogout());
    } else {
      const now = new Date().getTime() / 1000;
      const expireDate = localStorage.getItem('expiresDate');
      if (expireDate > now) {
        const localId = localStorage.getItem('localId');
        dispatch(authSuccess(true, token, localId));
      } else {
        dispatch(authLogout());
      }
    }
  };
};
