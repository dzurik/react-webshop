import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import classes from './SignBlueprint.module.scss';
import AddButton from '../../components/UI/AddButton/AddButton';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import { checkValidity, updateObject } from '../../shared/utility';
import { updateErrorMessage } from './errorMessages';

const SignBlueprint = (props) => {
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  /* prettier-ignore */
  const formHelper = (type, label, placeholder, value, required, isEmail,minLength, maxLength, ) => {
    let obj = {
      name: label,
      placeholder: placeholder,
      inputType: type,
      value: value,
      validation: {
        required: required,
        minLength: minLength,
        maxLength: maxLength,
        isEmail: isEmail,
        
      },
      errorMessage: '',
      valid: false,
      touched: false,
    };

    return obj;
  };

  const [authForm, setAuthForm] = useState({
    email: formHelper('email', 'Email address:', 'xyz@gmail.com', '', true, true),
    password: formHelper('password', 'Password:', 'Qwertzzzz123', '', true, false, 6, 16),
  });
  const [formValid, setFormValid] = useState(false);

  const inputChangedHandler = (event, inputName, error) => {
    const [isValid, errorMessage] = checkValidity(
      event.target.value,
      authForm[inputName].validation,
      error
    );

    let updatedValue = updateObject(authForm[inputName], {
      value: event.target.value,
      valid: isValid,
      touched: true,
      errorMessage: errorMessage,
    });

    let updatedForm = updateObject(authForm, {
      [inputName]: updatedValue,
    });

    let formIsValid = true;

    Object.keys(updatedForm).forEach((key) => {
      if (!updatedForm[key].valid && formIsValid) formIsValid = false;
    });

    setFormValid(formIsValid);
    setAuthForm(updatedForm);
  };

  const formElementsArray = [];

  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key],
    });
  }

  let authRedirect = null;
  if (isAuthenticated) {
    authRedirect = <Redirect to="/myaccount" />;
  }

  let formBody = (
    <div className={classes.Spinner}>
      <Spinner />
    </div>
  );

  if (!props.loading) {
    formBody = formElementsArray.map((input) => {
      return (
        <Input
          key={input.id}
          type={input.config.inputType}
          name={input.config.name}
          placeholder={input.config.placeholder}
          errorMessage={input.config.errorMessage}
          valid={input.config.valid}
          touched={input.config.touched}
          value={input.config.value}
          changed={(event) =>
            inputChangedHandler(event, input.id, input.config.errorMessage)
          }
          flexStyle="column"
        />
      );
    });
  }

  return (
    <div className={classes.SignUp}>
      {authRedirect}
      <div>
        <h3>
          <Link to="/" className={classes.Link}>
            Home
          </Link>{' '}
          / {props.title}
        </h3>
      </div>

      <div className={classes.Form}>
        <h1>{props.title}</h1>

        {props.errorMessage ? (
          <p className={classes.Error}>{updateErrorMessage(props.errorMessage)}</p>
        ) : null}
        <div className={classes.FormBody}>{formBody}</div>
        {props.title === 'Sign In' ? (
          <div className={classes.Registrate}>
            <span>Register here:</span> <Link to="/signup">Click</Link>
          </div>
        ) : null}

        <AddButton
          disabled={formValid}
          clicked={() => props.clicked(authForm.email.value, authForm.password.value)}
        >
          sign up
        </AddButton>
      </div>
    </div>
  );
};

export default SignBlueprint;
