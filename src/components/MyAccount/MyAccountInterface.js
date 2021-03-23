import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const MyAccountInterface = (props) => {
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  let authRedirect = null;
  if (!isAuthenticated) {
    authRedirect = <Redirect to="/signin" />;
  }

  return <div>{authRedirect}MyAccountInterface</div>;
};

export default MyAccountInterface;
