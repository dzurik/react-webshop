import React from 'react';
import classes from './NavCart.module.scss';
import { RiShoppingCart2Line } from 'react-icons/ri';

const NavCart = () => {
  const counter = 2;

  return (
    <div className={classes.NavCart}>
      <div className={classes.Counter}>{counter}</div>
      <RiShoppingCart2Line className={classes.Cart} />
    </div>
  );
};

export default NavCart;
