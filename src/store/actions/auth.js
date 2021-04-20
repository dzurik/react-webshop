import axios from 'axios';
import axiosFirebase from '../../axios-firebase';
import { updateObject } from '../../shared/utility';
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

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const loadUserDataSuccess = (data, email) => {
  return {
    type: actionTypes.LOAD_USER_DATA_SUCCESS,
    data: data,
    email: email,
  };
};

const loadUserDataFail = () => {
  return {
    type: actionTypes.LOAD_USER_DATA_FAIL,
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
          axiosFirebase.put(`users/${response.data.localId}/personal.json`, {
            userName: email.split('@')[0],
            userId: response.data.localId,
            email: email,
          });
        }

        loadUserData(dispatch, response.data.localId, email);
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
        loadUserData(dispatch, localId);
      } else {
        dispatch(authLogout());
      }
    }
  };
};

const loadUserData = (dispatch, localId, email) => {
  axiosFirebase
    .get(`users/${localId}/personal.json`)
    .then((response) => {
      dispatch(loadUserDataSuccess(response.data, email));
    })
    .catch((error) => {
      dispatch(loadUserDataFail());
    });
};

const updatePersonalDataStart = () => {
  return {
    type: actionTypes.UPDATE_PERSONAL_DATA_START,
  };
};

const updatePersonalDataSuccess = (formData, detailType) => {
  return {
    type: actionTypes.UPDATE_PERSONAL_DATA_SUCCESS,
    formData: formData,
    detailType: detailType,
  };
};

const updatePersonalDataFail = () => {
  return {
    type: actionTypes.UPDATE_PERSONAL_DATA_FAIL,
  };
};

export const updatePersonalData = (userId, formData, type) => {
  return (dispatch) => {
    dispatch(updatePersonalDataStart());

    let updatedFormData = {};

    Object.keys(formData).forEach((key) => {
      updatedFormData = updateObject(updatedFormData, { [key]: formData[key].value });
    });

    axiosFirebase
      .patch(`users/${userId}/personal.json`, updatedFormData)
      .then((response) => {
        dispatch(updatePersonalDataSuccess(updatedFormData, type));
      })
      .catch((error) => {
        dispatch(updatePersonalDataFail());
      });
  };
};
