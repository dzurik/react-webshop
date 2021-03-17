/* prettier-ignore */
const formHelper = (type, label, placeholder, value, required, minLength, errorMessage, isNumeric, onSale) => {
    let obj = {
      name: label,
      placeholder: placeholder,
      inputType: type,
      value: value,
      validation: {
        required: required,
        minLength: minLength,
        isNumeric: isNumeric,
        onSale: onSale,
      },
      errorMessage: errorMessage,
      valid: !required,
      touched: !required,
    };

    return obj;
  };

export const phone = {
  name: formHelper(
    'text',
    'Model Name',
    'Iphone 12',
    '',
    true,
    6,
    'Please write valid name!'
  ),
  imageUrl: formHelper(
    'text',
    'ImageUrl',
    'https://google.com//iphone12.png',
    '',
    true,
    10,
    'Please write valid url!'
  ),
  cpu: formHelper('text', 'CPU Model', '5', '', true, 6, 'Please write positive number!'),
  cores: formHelper(
    'number',
    'CPU Cores',
    'Snapdragon™ 730G',
    '',
    true,
    null,
    'Please write valid number!',
    true
  ),

  display: formHelper(
    'text',
    'Display Size (inch)',
    '5.8',
    '',
    true,
    null,
    'Please write positive number!',
    true
  ),
  ram: formHelper(
    'number',
    'Memory Size (GB)',
    '4',
    '',
    true,
    null,
    'Please write positive number!',
    true
  ),
  storage: formHelper(
    'number',
    'Storage Capacity (GB)',
    '128',
    '',
    true,
    null,
    'Please write positive number!',
    true
  ),
  quantity: formHelper(
    'number',
    'Quantity',
    '5',
    '',
    true,
    null,
    'Please write positive number!',
    true
  ),
  price: formHelper(
    'text',
    'Price (€)',
    '299',
    '',
    true,
    null,
    'Please write valid number!',
    true
  ),
  sale: formHelper(
    'number',
    'Sale (%)',
    '0-99',
    '',
    false,
    null,
    'Please write valid number!',
    false,
    true
  ),
};

export const laptop = {
  name: formHelper(
    'text',
    'Model Name',
    'HP Pavilion Gaming 17-cd0003ng',
    '',
    true,
    6,
    'Please write valid name!'
  ),
  imageUrl: formHelper(
    'text',
    'ImageUrl',
    'https://google.com//pavilion17.png',
    '',
    true,
    10,
    'Please write valid url!'
  ),
  cpu: formHelper(
    'text',
    'CPU Model',
    'Intel Core™ i5-9300H 4x 2.40 GHz',
    '',
    true,
    6,
    'Please write positive number!'
  ),
  displaySize: formHelper(
    'text',
    'Display Size (inch)',
    '17.3',
    '',
    true,
    null,
    'Please write positive number!',
    true
  ),
  display: formHelper(
    'text',
    'Display Details',
    '1920 x 1080, 144Hz, IPS, non-glare',
    '',
    true,
    null,
    'Please write positive number!'
  ),
  ram: formHelper(
    'number',
    'Memory Size (GB)',
    '4',
    '',
    true,
    null,
    'Please write positive number!',
    true
  ),
  storage: formHelper(
    'text',
    'Storage',
    '128GB SSD',
    '',
    true,
    null,
    'Please write positive number!'
  ),
  storageSecondary: formHelper(
    'text',
    'Secondary Storage',
    '500GB HDD',
    '',
    false,
    null,
    'Please write positive number!'
  ),
  vga: formHelper(
    'text',
    'Videocard',
    'NVIDIA® GeForce® GTX 1660 Ti 6.0 GB',
    '',
    true,
    null,
    'Please write positive number!'
  ),
  quantity: formHelper(
    'number',
    'Quantity',
    '5',
    '',
    true,
    null,
    'Please write positive number!',
    true
  ),
  price: formHelper(
    'text',
    'Price (€)',
    '299',
    '',
    true,
    null,
    'Please write valid number!',
    true
  ),
  sale: formHelper(
    'number',
    'Sale (%)',
    '0-99',
    '',
    false,
    null,
    'Please write valid number!',
    false,
    true
  ),
};
