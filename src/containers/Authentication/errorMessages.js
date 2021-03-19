const errors = [
  {
    type: 'EMAIL_NOT_FOUND',
    answer:
      'There is no user record corresponding to this identifier. The user may have been deleted.',
  },
  {
    type: 'INVALID_PASSWORD',
    answer: 'The password is invalid or the user does not have a password.',
  },
  {
    type: 'USER_DISABLED',
    answer: 'The user account has been disabled by an administrator.',
  },
  {
    type: 'EMAIL_EXISTS',
    answer: 'The email address is already in use by another account.',
  },
  {
    type: 'OPERATION_NOT_ALLOWED',
    answer: 'Password sign-in is disabled for this project.',
  },
  {
    type: 'TOO_MANY_ATTEMPTS_TRY_LATER',
    answer:
      'We have blocked all requests from this device due to unusual activity. Try again later.',
  },
];

export const updateErrorMessage = (errorMessage) => {
  let updatedErrorMessage;

  errors.forEach((error) => {
    if (error.type === errorMessage) {
      updatedErrorMessage = error.answer;
    }
  });
  return updatedErrorMessage;
};
