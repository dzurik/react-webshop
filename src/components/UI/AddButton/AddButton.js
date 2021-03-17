import React from 'react';
import classes from './AddButton.module.scss';

const AddButton = (props) => {
  return (
    <button
      className={classes.AddButton}
      onClick={props.clicked}
      disabled={!props.disabled}
    >
      {props.children}
    </button>
  );
};

export default AddButton;
