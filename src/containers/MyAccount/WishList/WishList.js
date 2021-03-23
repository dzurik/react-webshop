import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './WishList.module.scss';
import MyAccountMenu from '../../../components/MyAccount/MyAccountMenu/MyAccountMenu';

const WishList = (props) => {
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  let authRedirect = null;
  if (!isAuthenticated) {
    authRedirect = <Redirect to="/signin" />;
  }

  return (
    <div className={classes.WishList}>
      {authRedirect}
      <h1 className={classes.Title}> &lsaquo; My Wishlist &rsaquo; </h1>
      <MyAccountMenu />
      <div>WishList</div>
    </div>
  );
};

export default WishList;
