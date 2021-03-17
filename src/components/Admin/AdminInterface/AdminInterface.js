import React from 'react';
import classes from './AdminInterface.module.scss';
import AddProducts from '../../../containers/Admin/AddProducts/AddProducts';
import EditProducts from '../../../containers/Admin/EditProducts/EditProducts';

const AdminInterface = (props) => {
  return (
    <div className={classes.AdminInterface}>
      <h1>{props.selected}</h1>
      <hr />

      <div className={classes.Content}></div>
      {props.selected === 'Add Products' ? <AddProducts /> : <EditProducts />}
    </div>
  );
};

export default AdminInterface;
