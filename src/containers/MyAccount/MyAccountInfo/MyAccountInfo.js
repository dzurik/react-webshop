import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './MyAccountInfo.module.scss';
import MyAccountMenu from '../../../components/MyAccount/MyAccountMenu/MyAccountMenu';

const MyAccountInfo = (props) => {
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  let authRedirect = null;
  if (!isAuthenticated) {
    authRedirect = <Redirect to="/signin" />;
  }

  return (
    <div className={classes.MyAccountInfo}>
      {authRedirect}
      <h1 className={classes.Title}> &lsaquo; My Account Info &rsaquo; </h1>
      <MyAccountMenu />
      <div>My Account Info</div>
    </div>
  );
};

export default MyAccountInfo;
