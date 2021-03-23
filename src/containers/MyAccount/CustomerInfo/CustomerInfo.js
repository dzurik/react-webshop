import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './CustomerInfo.module.scss';
import MyAccountMenu from '../../../components/MyAccount/MyAccountMenu/MyAccountMenu';

const CustomerInfo = (props) => {
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  let authRedirect = null;
  if (!isAuthenticated) {
    authRedirect = <Redirect to="/signin" />;
  }

  return (
    <div className={classes.CustomerInfo}>
      {authRedirect}
      <h1 className={classes.Title}> &lsaquo; Customer Info &rsaquo; </h1>
      <MyAccountMenu />
      <div>Customer Info</div>
    </div>
  );
};

export default CustomerInfo;
