import React from 'react';
import classes from './AdminMenuItem.module.scss';

const AdminMenuItem = (props) => {
  return (
    <li className={classes.AdminMenuItem} onClick={props.clicked}>
      {props.children} <span>&rsaquo;</span>
    </li>
  );
};

export default AdminMenuItem;
