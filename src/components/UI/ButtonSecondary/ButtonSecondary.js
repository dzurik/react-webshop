import classes from './ButtonSecondary.module.scss';

const ButtonSecondary = (props) => {
  return (
    <button className={classes.ButtonSecondary} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default ButtonSecondary;
