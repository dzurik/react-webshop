import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  loading: false,
  errorMessage: null,
};

const signUpStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const signUpSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const signUpFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    errorMessage: action.errorMessage,
  });
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.SIGN_UP_START) {
    console.log('signup_start');
    return signUpStart(state, action);
  }

  if (action.type === actionTypes.SIGN_UP_SUCCESS) {
    console.log('signup_success');
    return signUpSuccess(state, action);
  }

  if (action.type === actionTypes.SIGN_UP_FAIL) {
    console.log('signup_fail');
    return signUpFail(state, action);
  }

  return state;
};

export default reducer;
