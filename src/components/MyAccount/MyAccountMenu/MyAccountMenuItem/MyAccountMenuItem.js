import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './MyAccountMenuItem.module.scss';

const MyAccountMenuItem = (props) => {
  return (
    <NavLink
      className={classes.MyAccountMenuItem}
      activeClassName={classes.active}
      exact
      to={props.linkRoute ? `/${props.linkRoute}/${props.link}?` : '/' + props.link}
    >
      <li>{props.title}</li>
    </NavLink>
  );
};

export default MyAccountMenuItem;
