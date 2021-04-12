import classes from './Button.module.scss';

const Button = (props) => {
  return (
    <button className={classes.Button} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Button;
