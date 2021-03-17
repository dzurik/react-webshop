import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';
import NavCart from '../../../containers/NavCart/NavCart';

import React from 'react';

const NavigationItems = (props) => {
  return (
    <React.Fragment>
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Home</NavigationItem>
        <NavigationItem link="/phones">Phones</NavigationItem>
        <NavigationItem link="/laptops">Laptops</NavigationItem>
        <NavigationItem link="/computers">Computers & Components</NavigationItem>
        <NavigationItem link="/login">Sign In</NavigationItem>
      </ul>
      <NavCart />
    </React.Fragment>
  );
};

export default NavigationItems;
