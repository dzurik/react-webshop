export const updateObject = (prevState, updatedState) => {
  return {
    ...prevState,
    ...updatedState,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.required && isValid) {
    isValid = value.length > 0;
  }

  if (rules.isNumeric && isValid) {
    isValid = typeof value && value > 0;
  }

  if (rules.onSale && isValid) {
    isValid = value === '' || (value > 0 && value < 100);
  }

  if (rules.minLength && isValid) {
    isValid = value.length >= rules.minLength;
  }

  return isValid;
};
