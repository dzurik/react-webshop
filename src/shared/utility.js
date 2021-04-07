export const updateObject = (prevState, updatedState) => {
  return {
    ...prevState,
    ...updatedState,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  let errorMessage = '';

  if (rules.required && isValid) {
    isValid = value.length > 0;
    if (!isValid) errorMessage = "This field can't be empty!";
  }

  if (rules.isNumeric && isValid) {
    isValid = typeof value && value > 0;
    if (!isValid) errorMessage = 'Please write positive number!';
  }

  if (rules.onSale && isValid) {
    isValid = value === '' || (value > 0 && value < 100);
    if (!isValid) errorMessage = 'Your number must between 0 and 100!';
  }

  if (rules.minLength && isValid) {
    isValid = value.length >= rules.minLength;
    if (!isValid)
      errorMessage = `This field must be at least ${rules.minLength} characters long!`;
  }

  if (rules.isEmail && isValid) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
    if (!isValid) errorMessage = `Please use valid email address!`;
  }

  return [isValid, errorMessage];
};

export const updatePrice = (price, sale) => {
  let number = price;
  let updatedSale = sale / 100;

  if (sale) {
    number = number - number * updatedSale;
  }

  number = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(number);
  return number;
};
