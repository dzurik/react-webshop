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
    return state.auth.userDetails.userName;
  });

  const firstName = useSelector((state) => {
    return state.auth.userDetails.firstName;
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
        <h2>
          Welcome <span>{firstName ? firstName : userName}!</span>
        </h2>
        <p>
          You are currently logged in under the username <span>{userName}</span>.
        </p>
      </div>
    </div>
  );
};

export default MyAccount;
