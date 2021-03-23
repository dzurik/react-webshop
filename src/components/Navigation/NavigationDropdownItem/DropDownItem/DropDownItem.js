import React from 'react';
import { Link } from 'react-router-dom';

import classes from './DropDownItem.module.scss';

const DropDownItem = (props) => {
  return (
    <li className={classes.DropDownItem}>
      <Link
        to={props.linkRoute ? `/${props.linkRoute}/${props.link}?` : '/' + props.link}
      >
        {props.title}
      </Link>
    </li>
  );
};

export default DropDownItem;
