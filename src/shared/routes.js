export const products = [
  {
    productType: 'phone',
    link: 'phones',
    title: 'Phones',
    filters: {},
  },
  {
    productType: 'laptop',
    link: 'laptops',
    title: 'Laptops',
    filters: {},
  },
  {
    productType: 'computer',
    link: 'computers',
    title: 'Computers',
    component: true,
    filters: {},
  },
  {
    productType: 'processor',
    link: 'processors',
    linkRoute: 'computers',
    title: 'Processors (CPU)',
    component: true,
    filters: {},
  },
  {
    productType: 'graphicsCard',
    link: 'vga',
    linkRoute: 'computers',
    title: 'Graphics Cards',
    component: true,
    filters: {},
  },
  {
    productType: 'motherboard',
    link: 'motherboards',
    linkRoute: 'computers',
    title: 'Motherboards',
    component: true,
    filters: {},
  },
  {
    productType: 'memory',
    link: 'ram',
    linkRoute: 'computers',
    title: 'Memory (RAM)',
    component: true,
    filters: {},
  },
  {
    productType: 'powerSupply',
    link: 'psu',
    linkRoute: 'computers',
    title: 'Power Supply Unit (PSU)',
    component: true,
    filters: {},
  },
  {
    productType: 'hardDrive',
    link: 'hard_drives',
    linkRoute: 'computers',
    title: 'Hard Drives',
    component: true,
    filters: {},
  },
];

export const myaccount = [
  {
    title: 'My Account Info',
    link: 'info',
    linkRoute: 'myaccount',
  },
  {
    title: 'My Orders',
    link: 'orders',
    linkRoute: 'myaccount',
  },
  {
    title: 'Logout',
    link: 'logout',
  },
];
