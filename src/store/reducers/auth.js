import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  signInLoading: false,
  signInErrorMessage: null,
  signUpLoading: false,
  signUpErrorMessage: null,
};

const authStart = (state, action) => {
  let updatedObject;

  if (action.signUp) {
    updatedObject = updateObject(state, {
      signUpLoading: true,
    });
  }

  if (!action.signUp) {
    updatedObject = updateObject(state, {
      signInLoading: true,
    });
  }

  return updatedObject;
};

const authSuccess = (state, action) => {
  let updatedObject;

  if (action.signUp) {
    updatedObject = updateObject(state, {
      signUpLoading: false,
      token: action.token,
      userId: action.localId,
    });
  }

  if (!action.signUp) {
    updatedObject = updateObject(state, {
      signInLoading: false,
      token: action.token,
      userId: action.localId,
    });
  }

  return updatedObject;
};

const authFail = (state, action) => {
  let updatedObject;
  if (action.signUp) {
    updatedObject = updateObject(state, {
      signUpLoading: false,
      signUpErrorMessage: action.errorMessage,
    });
  }

  if (!action.signUp) {
    updatedObject = updateObject(state, {
      signInLoading: false,
      signInErrorMessage: action.errorMessage,
    });
  }

  return updatedObject;
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
  });
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.AUTH_START) {
    return authStart(state, action);
  }

  if (action.type === actionTypes.AUTH_SUCCESS) {
    return authSuccess(state, action);
  }

  if (action.type === actionTypes.AUTH_FAIL) {
    return authFail(state, action);
  }

  if (action.type === actionTypes.AUTH_LOGOUT) {
    return authLogout(state, action);
  }

  return state;
};

export default reducer;
