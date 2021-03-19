import axios from 'axios';
import axiosFirebase from '../../axios-firebase';
import * as actionTypes from './actionTypes';

const signInStart = () => {
  return {
    type: actionTypes.SIGN_IN_START,
  };
};

const signInSuccess = () => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
  };
};

const signInFail = () => {
  return {
    type: actionTypes.SIGN_IN_FAIL,
  };
};

export const signIn = () => {
  return (dispatch) => {
    dispatch(signInStart());
    axios
      .get(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByXTnLPfYZdrsShd0oilUlRHjiNxcRujk'
      )
      .then((response) => {
        console.log(response);
        dispatch(signInSuccess());
      })
      .catch((error) => dispatch(signInFail()));
  };
};

const signUpStart = () => {
  return {
    type: actionTypes.SIGN_UP_START,
  };
};

const signUpSuccess = () => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
  };
};

const signUpFail = (error) => {
  return {
    type: actionTypes.SIGN_UP_FAIL,
    errorMessage: error.message,
  };
};

export const signUp = (email, password) => {
  const config = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  return (dispatch) => {
    dispatch(signUpStart());
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyByXTnLPfYZdrsShd0oilUlRHjiNxcRujk',
        config
      )
      .then((response) => {
        console.log(response);
        dispatch(signUpSuccess(response.data.idToken, response.data.localId));
        axiosFirebase.post('users.json', {
          userName: email.split('@')[0],
          userId: response.data.localId,
        });
      })
      .catch((error) => {
        console.log(error.response.data.error);
        dispatch(signUpFail(error.response.data.error));
      });
  };
};
