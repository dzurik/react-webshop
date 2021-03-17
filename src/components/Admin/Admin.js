import { useState } from 'react';
import classes from './Admin.module.scss';
import AdminMenuItem from './AdminMenuItem/AdminMenuItem';
import AdminInterface from './AdminInterface/AdminInterface';

const Admin = (props) => {
  const [selectedMenu, setSelectedMenu] = useState('Add Products');

  return (
    <div className={classes.Admin}>
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
          <AdminMenuItem>Logout</AdminMenuItem>
        </ul>
      </div>
      <AdminInterface selected={selectedMenu} />
    </div>
  );
};

export default Admin;
