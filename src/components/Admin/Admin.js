import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import classes from './Admin.module.scss';
import AdminMenuItem from './AdminMenuItem/AdminMenuItem';
import AdminInterface from './AdminInterface/AdminInterface';

const Admin = (props) => {
  const [selectedMenu, setSelectedMenu] = useState('Add Products');

  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  let authRedirect = null;

  if (!isAuthenticated) {
    authRedirect = <Redirect to="/signin" />;
  }

  return (
    <div className={classes.Admin}>
      {authRedirect}
      <h1 className={classes.Title}> &lsaquo; Admin Interface &rsaquo; </h1>
      <div className={classes.Menu}>
        <ul>
          <AdminMenuItem clicked={() => setSelectedMenu('Add Products')}>
            Add Products
          </AdminMenuItem>
          <AdminMenuItem clicked={() => setSelectedMenu('Edit Products')}>
            Edit Products
          </AdminMenuItem>
          <hr />
          <Link className={classes.Link} to="/logout">
            <AdminMenuItem>Logout</AdminMenuItem>
          </Link>
        </ul>
      </div>
      <AdminInterface selected={selectedMenu} />
    </div>
  );
};

export default Admin;
