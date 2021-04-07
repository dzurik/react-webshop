/* prettier-ignore */
const formHelper = (type, label, placeholder, value, options, required, minLength, isNumeric, onSale) => {
    let obj = {
      name: label,
      placeholder: placeholder,
      inputType: type,
      value: value,
      options: [...options],
      validation: {
        required: required,
        minLength: minLength,
        isNumeric: isNumeric,
        onSale: onSale,
      },
      errorMessage: '',
      valid: !required,
      touched: !required,
    };

    return obj;
  };

export const phone = {
  manufacturer: formHelper(
    'select',
    'Manufacturer',
    'Manufacturer',
    null,
    [
      {
        name: 'Apple',
        value: 'apple',
      },
      {
        name: 'Huawei',
        value: 'huawei',
      },
      {
        name: 'Samsung',
        value: 'Samsung',
      },
      {
        name: 'Xiaomi',
        value: 'xiaomi',
      },
    ],

    true
  ),
  name: formHelper('text', 'Model Name', 'Iphone 12', '', '', true, 6),
  imageUrl: formHelper(
    'text',
    'Image URL',
    'https://google.com//iphone12.png',
    '',
    '',
    true,
    10
  ),
  cpu: formHelper('text', 'CPU Model', 'Snapdragon™ 730G', '', '', true, 6),
  cores: formHelper('number', 'CPU Cores', '5', '', '', true, null, true),
  cpuSpeed: formHelper('text', 'CPU Speed (GHz)', '2.73', '', '', true),
  display: formHelper('text', 'Display Size (inch)', '5.8', '', '', true, null, true),
  ram: formHelper('number', 'Memory Size (GB)', '4', '', '', true, null, true),
  storage: formHelper('number', 'Storage Capacity (GB)', '128', '', '', true, null, true),
  quantity: formHelper('number', 'Quantity', '5', '', '', true, null, true),
  price: formHelper('text', 'Price (€)', '299', '', '', true, null, true),
  sale: formHelper('number', 'Sale (%)', '1-99', '', '', false, null, false, true),
};

export const laptop = {
  manufacturer: formHelper(
    'select',
    'Manufacturer',
    '',
    null,
    [
      {
        name: 'Acer',
        value: 'acer',
      },
      {
        name: 'Apple',
        value: 'apple',
      },
      {
        name: 'ASUS',
        value: 'asus',
      },
      {
        name: 'Dell',
        value: 'dell',
      },

      {
        name: 'HP',
        value: 'hp',
      },
    ],

    true
  ),
  name: formHelper(
    'text',
    'Model Name',
    'HP Pavilion Gaming 17-cd0003ng',
    '',
    '',
    true,
    6
  ),
  imageUrl: formHelper(
    'text',
    'Image URL',
    'https://google.com//pavilion17.png',
    '',
    '',
    true,
    10
  ),
  cpuType: formHelper(
    'select',
    'CPU Manufacturer',
    '',
    null,
    [
      { name: 'AMD', value: 'amd' },
      { name: 'Intel', value: 'intel' },
    ],
    true
  ),
  cpu: formHelper(
    'text',
    'CPU Model',
    'Intel Core™ i5-9300H 4x 2.40 GHz',
    '',
    '',
    true,
    6
  ),
  displaySize: formHelper(
    'text',
    'Display Size (inch)',
    '17.3',
    '',
    '',
    true,
    null,
    true
  ),
  display: formHelper(
    'text',
    'Display Details',
    '1920 x 1080, 144Hz, IPS, non-glare',
    '',
    '',
    true,
    null
  ),
  ram: formHelper('number', 'Memory Size (GB)', '4', '', '', true, null, true),
  storage: formHelper('text', 'Storage', '128GB SSD', '', '', true, null),
  vgaType: formHelper(
    'select',
    'Graphics Card Type',
    '',
    '',
    [
      { name: 'Dedicated', value: 'dedicated' },
      { name: 'Integrated', value: 'integrated' },
    ],
    true
  ),
  vga: formHelper(
    'text',
    'Graphics Card',
    'NVIDIA® GeForce® GTX 1660 Ti 6 GB',
    '',
    '',
    true,
    null
  ),
  windows: formHelper('text', 'Windows Type', 'Windows 10 Pro', '', '', true, null),
  quantity: formHelper('number', 'Quantity', '5', '', '', true, null, true),
  price: formHelper('text', 'Price (€)', '299', '', '', true, null, true),
  sale: formHelper('number', 'Sale (%)', '1-99', '', '', false, null, false, true),
};

export const computer = {
  name: formHelper('text', 'Model Name', 'AMD® Ryzen™ 7 3700U config', '', '', true, 6),
  imageUrl: formHelper(
    'text',
    'Image URL',
    'https://google.com//ryzen5.png',
    '',
    '',
    true,
    10
  ),
  cpuType: formHelper(
    'select',
    'CPU Manufacturer',
    '',
    null,
    [
      { name: 'AMD', value: 'amd' },
      { name: 'Intel', value: 'intel' },
    ],
    true
  ),
  cpu: formHelper('text', 'CPU Model', 'AMD® Ryzen™ 7 3700U', '', '', true, 6),
  motherboard: formHelper('text', 'Motherboard Model', 'Asus H410M-A', '', '', true, 6),
  ram: formHelper('number', 'Memory Size (GB)', '16', '', '', true, null, true),
  ramType: formHelper('text', 'Memory Type', 'DDR4', '', '', true),
  storage: formHelper('text', 'Storage', '500GB SSD', '', '', true, null),
  vgaType: formHelper(
    'select',
    'Graphics Card Type',
    '',
    '',
    [
      { name: 'Dedicated', value: 'dedicated' },
      { name: 'Integrated', value: 'integrated' },
    ],
    true
  ),
  vga: formHelper(
    'text',
    'Graphics Card',
    'NVIDIA® GeForce® GTX 1660 Ti 6 GB',
    '',
    '',
    true,
    null
  ),
  psu: formHelper('number', 'Power Supply Unit (W)', '500', '', '', true, null, true),
  quantity: formHelper('number', 'Quantity', '5', '', '', true, null, true),
  price: formHelper('text', 'Price (€)', '299', '', '', true, null, true),
  sale: formHelper('number', 'Sale (%)', '1-99', '', '', false, null, false, true),
};

export const processor = {
  manufacturer: formHelper(
    'select',
    'Manufacturer',
    '',
    null,
    [
      {
        name: 'AMD',
        value: 'amd',
      },
      {
        name: 'Intel',
        value: 'intel',
      },
    ],

    true
  ),
  imageUrl: formHelper(
    'text',
    'Image URL',
    'https://google.com//ryzen5.png',
    '',
    '',
    true,
    10
  ),
  name: formHelper('text', 'Model Name', 'Ryzen 5 3600 6x 3.6GHz', '', '', true, 6),
  cores: formHelper('number', 'Cores', '4', '', '', true, null, true),
  threads: formHelper('number', 'Threads', '8', '', '', true, null, true),
  frequency: formHelper('text', 'Base Frequency (Ghz)', '2.5', '', '', true),
  frequencyTurbo: formHelper('text', 'Turbo Frequency (Ghz)', '3.6', '', '', true),
  tdp: formHelper('number', 'TDP (W)', '65', '', '', true, null, true),
  socket: formHelper(
    'select',
    'CPU Socket',
    '',
    '',
    [
      { name: 'AM4', value: 'am4' },
      { name: 'LGA1151', value: 'lga1151' },
      { name: 'LGA2033', value: 'lga2033' },
    ],
    true
  ),
  graphicsCard: formHelper('text', 'Graphics Card', 'AMD RX Vega 11', '', '', true, 6),
  quantity: formHelper('number', 'Quantity', '5', '', '', true, null, true),
  price: formHelper('text', 'Price (€)', '299', '', '', true, null, true),
  sale: formHelper('number', 'Sale (%)', '1-99', '', '', false, null, false, true),
};

export const graphicsCard = {
  manufacturer: formHelper(
    'select',
    'Manufacturer',
    '',
    null,
    [
      {
        name: 'ASUS',
        value: 'asus',
      },
      {
        name: 'Gigabyte',
        value: 'gigabyte',
      },

      {
        name: 'MSI',
        value: 'msi',
      },
      {
        name: 'SAPPHIRE',
        value: 'sapphire',
      },
    ],

    true
  ),
  name: formHelper(
    'text',
    'Model Name',
    'ASUS GeForce GTX 1050 Ti 4GB GDDR5 128bit',
    '',
    '',
    true,
    6
  ),
  imageUrl: formHelper(
    'text',
    'Image URL',
    'https://google.com//gtx1050ti.png',
    '',
    '',
    true,
    10
  ),
  chipSpeed: formHelper('number', 'Chip Speed (Mhz)', '1290', '', '', true, null, true),
  memorySpeed: formHelper(
    'number',
    'Memory Speed (MHz)',
    '7008',
    '',
    '',
    true,
    null,
    true
  ),
  memory: formHelper('number', 'Memory Size (GB)', '4', '', '', true, null, true),
  memoryBus: formHelper(
    'number',
    'Memory Bus Size (bit)',
    '128',
    '',
    '',
    true,
    null,
    true
  ),
  tdp: formHelper('number', 'Recommend PSU (W)', '400', '', '', true, null, true),
  quantity: formHelper('number', 'Quantity', '5', '', '', true, null, true),
  price: formHelper('text', 'Price (€)', '299', '', '', true, null, true),
  sale: formHelper('number', 'Sale (%)', '1-99', '', '', false, null, false, true),
};

export const motherboard = {
  manufacturer: formHelper(
    'select',
    'Manufacturer',
    '',
    null,
    [
      {
        name: 'ASUS',
        value: 'asus',
      },
      {
        name: 'ASRock',
        value: 'asrock',
      },
      {
        name: 'GIGABYTE',
        value: 'gigabyte',
      },
      {
        name: 'MSI',
        value: 'msi',
      },
    ],

    true
  ),
  name: formHelper('text', 'Model Name', 'MSI B450 TOMAHAWK MAX', '', '', true, 6),
  imageUrl: formHelper(
    'text',
    'Image URL',
    'https://google.com//MSI_B450.png',
    '',
    '',
    true,
    10
  ),
  socket: formHelper(
    'select',
    'Chipset',
    '',
    '',
    [
      { name: 'AMD B450', value: 'amd_b450' },
      { name: 'Intel H410', value: 'intel_h410' },
      { name: 'Intel B460', value: 'inte_B460' },
    ],
    true
  ),
  chipset: formHelper(
    'select',
    'CPU Socket',
    '',
    '',
    [
      { name: 'AM4', value: 'am4' },
      { name: 'LGA1151', value: 'lga1151' },
      { name: 'Socket 1200', value: 'socket1200' },
    ],
    true
  ),
  memory: formHelper('number', 'Memory Type', 'DDR4', '', '', true, null, true),
  memorySlots: formHelper(
    'number',
    'Number of Memory Slot',
    '4',
    '',
    '',
    true,
    null,
    true
  ),
  quantity: formHelper('number', 'Quantity', '5', '', '', true, null, true),
  price: formHelper('text', 'Price (€)', '299', '', '', true, null, true),
  sale: formHelper('number', 'Sale (%)', '1-99', '', '', false, null, false, true),
};

export const memory = {
  manufacturer: formHelper(
    'select',
    'Manufacturer',
    '',
    null,
    [
      {
        name: 'Corsair',
        value: 'corsair',
      },
      {
        name: 'Crucial',
        value: 'crucial',
      },
      {
        name: 'G.SKILL',
        value: 'gskill',
      },
      {
        name: 'Kingston',
        value: 'kingston',
      },
    ],

    true
  ),
  name: formHelper(
    'text',
    'Model Name',
    'Kingston HyperX FURY 16GB (2x8GB) DDR4 3200MHz',
    '',
    '',
    true,
    6
  ),
  imageUrl: formHelper(
    'text',
    'Image URL',
    'https://google.com/Kingston16gb.png',
    '',
    '',
    true,
    10
  ),
  capacity: formHelper('number', 'Memory Size (GB)', '16', '', '', true, null, true),
  memoryType: formHelper('text', 'RAM Technology', 'DDR4', '', '', true),
  kit: formHelper('text', 'Number of modules', '2x8GB', '', '', false),
  speed: formHelper('number', 'RAM Speed (MHz)', '3600', '', '', true, null, true),
  latency: formHelper('text', 'CAS Latency', 'CL17', '', '', true),
  quantity: formHelper('number', 'Quantity', '5', '', '', true, null, true),
  price: formHelper('text', 'Price (€)', '299', '', '', true, null, true),
  sale: formHelper('number', 'Sale (%)', '1-99', '', '', false, null, false, true),
};

export const powerSupply = {
  manufacturer: formHelper(
    'select',
    'Manufacturer',
    '',
    null,
    [
      {
        name: 'Chieftec',
        value: 'chieftec',
      },
      {
        name: 'Corsair',
        value: 'Corsair Master',
      },
      {
        name: 'Cooler Master',
        value: 'coolermaster',
      },

      {
        name: 'FSP',
        value: 'fsp',
      },
      {
        name: 'Seasonic',
        value: 'seasonic',
      },
    ],

    true
  ),
  name: formHelper('text', 'PSU Name', 'Cooler Master Elite V3 600W', '', '', true, 6),
  imageUrl: formHelper(
    'text',
    'Image URL',
    'https://google.com//cooler600w.png',
    '',
    '',
    true,
    10
  ),
  efficiency: formHelper('text', 'Efficiency', '80+', '', '', false),
  pfc: formHelper('text', 'PFC', 'Active', '', '', true),
  fanSize: formHelper('number', 'Fan Size (mm)', '120', '', '', true, null, true),
  power: formHelper('number', 'Power (W)', '600', '', '', true, null, true),
  quantity: formHelper('number', 'Quantity', '5', '', '', true, null, true),
  price: formHelper('text', 'Price (€)', '299', '', '', true, null, true),
  sale: formHelper('number', 'Sale (%)', '1-99', '', '', false, null, false, true),
};

export const hardDrive = {
  manufacturer: formHelper(
    'select',
    'Manufacturer',
    '',
    null,
    [
      {
        name: 'Kingston',
        value: 'kingston',
      },
      {
        name: 'Samsung',
        value: 'samsung',
      },

      {
        name: 'Seagate',
        value: 'seagate',
      },
      {
        name: 'Toshiba',
        value: 'toshiba',
      },
      {
        name: 'Western Digital',
        value: 'wd',
      },
    ],

    true
  ),
  name: formHelper(
    'text',
    'Model Name',
    'Western Digital Caviar Blue 3.5 1TB 7200rpm 64MB SATA3',
    '',
    '',
    true,
    6
  ),
  imageUrl: formHelper(
    'text',
    'Image URL',
    'https://google.com//wd1tb.png',
    '',
    '',
    true,
    10
  ),
  hardDriveType: formHelper(
    'select',
    'Hard Drive Type',
    '',
    null,
    [
      {
        name: 'SSD',
        value: 'ssd',
      },
      {
        name: 'HDD',
        value: 'hdd',
      },
      {
        name: 'SSHD',
        value: 'sshd',
      },
    ],

    true
  ),
  interfaceType: formHelper('text', 'Interface Type', 'SATA3', '', '', true),
  capacity: formHelper('text', 'Capacity', '1TB', '', '', true),
  formFactor: formHelper('text', 'Form Factor (inch)', '2.5', '', '', false),
  speed: formHelper('number', 'Speed ', '5400', '', '', false, null, true),
  cache: formHelper('number', 'Cache (MB)', '128', '', '', false, null, true),
  reading: formHelper('number', 'Reading Speed (MB/s)', '560', '', '', false, null, true),
  writing: formHelper('number', 'Writing Speed (MB/s)', '530', '', '', false, null, true),
  quantity: formHelper('number', 'Quantity', '5', '', '', true, null, true),
  price: formHelper('text', 'Price (€)', '299', '', '', true, null, true),
  sale: formHelper('number', 'Sale (%)', '1-99', '', '', false, null, false, true),
};
