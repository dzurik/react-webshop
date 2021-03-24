import React from 'react';
import classes from './Input.module.scss';

const Input = (props) => {
  let inputClasses = [classes.Input];

  if (!props.valid && props.touched) {
    inputClasses.push(classes.Error);
  }

  if (props.flexStyle === 'column') {
    inputClasses.push(classes.Column);
  }

  return (
    <div className={classes.Input}>
      {props.type === 'select' ? (
        <React.Fragment>
          <label htmlFor={props.name}>{props.name}</label>
          <select
            className={inputClasses.join(' ')}
            id={props.name}
            onChange={props.changed}
            defaultValue="default"
          >
            <option value="default" disabled>
              Select {props.name}
            </option>
            {props.options.map((option) => {
              return (
                <option key={option.name} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </select>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <label htmlFor={props.name}>{props.name}</label>
          <input
            className={inputClasses.join(' ')}
            id={props.name}
            type={props.type}
            placeholder={props.placeholder}
            name={props.name}
            value={props.value}
            onChange={props.changed}
          />
        </React.Fragment>
      )}

      {props.touched && !props.valid ? <span>{props.errorMessage}</span> : null}
    </div>
  );
};

export default Input;
