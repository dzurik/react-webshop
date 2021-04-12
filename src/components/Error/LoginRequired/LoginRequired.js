import { Link } from 'react-router-dom';

import classes from './LoginRequired.module.scss';
import Button from '../../UI/Button/Button';
import ButtonSecondary from '../../UI/ButtonSecondary/ButtonSecondary';

const LoginRequired = (props) => {
  return (
    <div className={classes.LoginRequired}>
      <h2 className={classes.Title}>Sign in required</h2>
      <div className={classes.Body}>
        <h2>{props.message}</h2>
      </div>
      <div className={classes.Bottom}>
        <ButtonSecondary clicked={props.modalClose}>Close</ButtonSecondary>
        <Link to="/signin">
          <Button>Sign in</Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginRequired;
