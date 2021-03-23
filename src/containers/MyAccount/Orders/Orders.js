import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Orders.module.scss';
import MyAccountMenu from '../../../components/MyAccount/MyAccountMenu/MyAccountMenu';

const Orders = (props) => {
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  let authRedirect = null;
  if (!isAuthenticated) {
    authRedirect = <Redirect to="/signin" />;
  }

  return (
    <div className={classes.Orders}>
      {authRedirect}
      <h1 className={classes.Title}> &lsaquo; My Orders &rsaquo; </h1>
      <MyAccountMenu />
      <div>Orders</div>
    </div>
  );
};

export default Orders;
