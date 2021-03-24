import React from 'react';
import classes from './AddButton.module.scss';

const AddButton = (props) => {
  let addButtonClasses = [classes.AddButton];

  if (props.comp === 'Product') {
    addButtonClasses.push(classes.Product);
  }

  return (
    <button
      className={addButtonClasses.join(' ')}
      onClick={props.clicked}
      disabled={!props.disabled}
    >
      {props.children}
    </button>
  );
};

export default AddButton;
