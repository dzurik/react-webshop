/* prettier-ignore */
export const formHelper = ( label, placeholder, value, minLength, maxLength, isNumeric) => {
  
    let obj = {
      name: label,
      placeholder: placeholder,
      inputType: 'text',
      value: value,
      validation: {
        required: true,
        minLength: minLength,
        maxLength: maxLength,
        isNumeric: isNumeric,
      },
      errorMessage: '',
      valid: !value ? false: true,
      touched: !value ? false: true ,
    };

    return obj;
  };
