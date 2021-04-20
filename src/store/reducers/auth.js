import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,

  userDetails: {
    userName: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
  },
  address: {
    street: null,
    zipCode: null,
    city: null,
    country: null,
  },

  uploadLoading: false,
  uploadError: false,
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

const loadUserDataSuccess = (state, action) => {
  let updatedDetails = updateObject(state.userDetails, {
    userName: !action.data ? action.email.split('@')[0] : action.data.userName,
    email: action.email ? action.email : action.data.email,
    phone: action.data.phone,
    firstName: action.data.firstName,
    lastName: action.data.lastName,
  });

  let updatedAddress = updateObject(state.address, {
    city: action.data.city,
    street: action.data.street,
    country: action.data.country,
    zipCode: action.data.zipCode,
  });

  if (!action.data) {
    return updateObject(state, {
      userDetails: updatedDetails,
    });
  }

  return updateObject(state, {
    userDetails: updatedDetails,
    address: updatedAddress,
  });
};

const loadUserDataFail = (state, action) => {
  return updateObject(state, {});
};

const updatePersonalDataStart = (state, action) => {
  return updateObject(state, { uploadLoading: true });
};

const updatePersonalDataSuccess = (state, action) => {
  let updatedDetail = {};

  if (action.detailType === 'personal') {
    updatedDetail = updateObject(state.userDetails, {
      userName: action.formData.userName,
      firstName: action.formData.firstName,
      lastName: action.formData.lastName,
      phone: action.formData.phone,
    });

    return updateObject(state, { uploadLoading: false, userDetails: updatedDetail });
  }

  if (action.detailType === 'address') {
    updatedDetail = updateObject(state.address, {
      city: action.formData.city,
      street: action.formData.street,
      country: action.formData.country,
      zipCode: action.formData.zipCode,
    });

    return updateObject(state, { uploadLoading: false, address: updatedDetail });
  }
};

const updatePersonalDataFail = (state, action) => {
  return updateObject(state, { uploadError: true, uploadLoading: false });
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

  if (action.type === actionTypes.LOAD_USER_DATA_SUCCESS) {
    return loadUserDataSuccess(state, action);
  }

  if (action.type === actionTypes.LOAD_USER_DATA_FAIL) {
    return loadUserDataFail(state, action);
  }

  if (action.type === actionTypes.UPDATE_PERSONAL_DATA_START) {
    return updatePersonalDataStart(state, action);
  }

  if (action.type === actionTypes.UPDATE_PERSONAL_DATA_SUCCESS) {
    return updatePersonalDataSuccess(state, action);
  }

  if (action.type === actionTypes.UPDATE_PERSONAL_DATA_FAIL) {
    return updatePersonalDataFail(state, action);
  }

  return state;
};

export default reducer;
