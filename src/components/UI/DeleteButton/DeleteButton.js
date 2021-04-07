import React from 'react';
import classes from './DeleteButton.module.scss';

const DeleteButton = (props) => {
  return (
    <button className={classes.DeleteButton} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default DeleteButton;
