import React from 'react';
import classes from './Input.module.scss';

const Input = (props) => {
  let selectClasses = [classes.Input];
  let inputClasses = [classes.Input];

  if (!props.valid && props.touched) {
    selectClasses.push(classes.Error);
  }

  if (props.flexStyle === 'column') {
    selectClasses.push(classes.Column);
  }

  if (props.flexStyle === 'row') {
    inputClasses.push(classes.Row);
  }

  return (
    <div className={inputClasses.join(' ')}>
      {props.type === 'select' ? (
        <React.Fragment>
          <label htmlFor={props.name}>{props.name}</label>
          <select
            className={selectClasses.join(' ')}
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
            className={selectClasses.join(' ')}
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
