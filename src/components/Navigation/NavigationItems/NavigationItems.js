import React from 'react';
import { useSelector } from 'react-redux';

import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';
import NavCart from '../../../containers/Cart/NavCart/NavCart';
import NavWishList from '../../../containers/WishList/NavWishList/NavWishList';
import NavigationDropdownItem from '../NavigationDropdownItem/NavigationDropdownItem';
import { products, myaccount } from '../../../shared/routes';

const NavigationItems = (props) => {
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  return (
    <React.Fragment>
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Home</NavigationItem>
        <NavigationItem link="/phones">Phones</NavigationItem>
        <NavigationItem link="/laptops">Laptops</NavigationItem>
        <NavigationDropdownItem
          link="/computers"
          itemList={products.filter((product) => product.component === true)}
        >
          Computers &amp; Components
        </NavigationDropdownItem>

        {isAuthenticated ? (
          <NavigationDropdownItem link="/myaccount" itemList={myaccount}>
            My Account
          </NavigationDropdownItem>
        ) : (
          <NavigationItem link="/signin">Sign In</NavigationItem>
        )}
      </ul>

      {isAuthenticated ? <NavWishList /> : null}

      <NavCart />
    </React.Fragment>
  );
};

export default NavigationItems;
