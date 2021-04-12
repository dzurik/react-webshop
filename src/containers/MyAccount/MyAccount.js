import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './MyAccount.module.scss';
import MyAccountMenu from '../../components/MyAccount/MyAccountMenu/MyAccountMenu';

const MyAccount = (props) => {
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  const userName = useSelector((state) => {
    return state.auth.userName;
  });

  let authRedirect = null;
  if (!isAuthenticated) {
    authRedirect = <Redirect to="/signin" />;
  }

  return (
    <div className={classes.MyAccount}>
      {authRedirect}
      <h1 className={classes.Title}> &lsaquo; My account &rsaquo; </h1>
      <MyAccountMenu />
      <div className={classes.Info}>
        <h2>My account</h2>
        <p>You are currently logged in under the user name {userName}.</p>
      </div>
    </div>
  );
};

export default MyAccount;
