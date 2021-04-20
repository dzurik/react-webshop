import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './MyAccountInfo.module.scss';
import MyAccountMenu from '../../../components/MyAccount/MyAccountMenu/MyAccountMenu';
import Input from '../../../components/UI/Input/Input';
import AddButton from '../../../components/UI/AddButton/AddButton';
import { formHelper } from './Form';
import { checkValidity, updateObject } from '../../../shared/utility';
import * as actions from '../../../store/actions';

const MyAccountInfo = React.memo((props) => {
  const [changableDetail, setChangableDetail] = useState(null);
  const [selectedForm, setSelectedForm] = useState({});
  const [formValid, setFormValid] = useState(false);

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  const userId = useSelector((state) => {
    return state.auth.userId;
  });

  const userDetails = useSelector((state) => {
    return state.auth.userDetails;
  });

  const address = useSelector((state) => {
    return state.auth.address;
  });

  const onUpdatePersonalData = (userId, formData, type) => {
    dispatch(actions.updatePersonalData(userId, formData, type));
  };

  const sendUpdate = (event) => {
    event.preventDefault();
    onUpdatePersonalData(userId, selectedForm, changableDetail);
    setSelectedForm({});
    setChangableDetail(null);
  };

  const personalForm = {
    userName: formHelper(
      'Username',
      'Username',
      userDetails.userName ? userDetails.userName : '',
      4,
      12
    ),
    firstName: formHelper(
      'First Name',
      'First Name',
      userDetails.firstName ? userDetails.firstName : '',
      2,
      12
    ),
    lastName: formHelper(
      'Last Name',
      'Last Name',
      userDetails.lastName ? userDetails.lastName : '',
      2,
      12
    ),
    phone: formHelper(
      'Phone Number',
      '36707778888',
      userDetails.phone ? userDetails.phone : '',
      7,
      11,
      true
    ),
  };

  const addressForm = {
    country: formHelper(
      'Country',
      'Hungary',
      address.country ? address.country : '',
      4,
      12
    ),
    city: formHelper('City', 'Budapest', address.city ? address.city : '', 2, 20),
    zipCode: formHelper(
      'ZIP Code',
      '1065',
      address.zipCode ? address.zipCode : '',
      4,
      4,
      true
    ),
    street: formHelper(
      'Street',
      'Bajcsy-Zsilinszky 51.',
      address.street ? address.street : '',
      5,
      20
    ),
  };

  const change = (type) => {
    setFormValid(false);
    if (type === 'personal') {
      setChangableDetail('personal');
      setSelectedForm(personalForm);
    } else if (type === 'address') {
      setChangableDetail('address');
      setSelectedForm(addressForm);
    }
  };

  let authRedirect = null;
  if (!isAuthenticated) {
    authRedirect = <Redirect to="/signin" />;
  }

  const inputChangedHandler = (event, inputName) => {
    let [isValid, errorMessage] = checkValidity(
      event.target.value,
      selectedForm[inputName].validation
    );

    let updatedInputValue = updateObject(selectedForm[inputName], {
      value: event.target.value,
      valid: isValid,
      touched: true,
      errorMessage: errorMessage,
    });

    let updatedForm = updateObject(selectedForm, {
      [inputName]: updatedInputValue,
    });

    let formIsValid = true;

    Object.keys(updatedForm).forEach((key) => {
      if (!updatedForm[key].valid && formIsValid) formIsValid = false;
    });

    setFormValid(formIsValid);
    setSelectedForm(updatedForm);
  };

  const formElementsArray = [];

  for (let key in selectedForm) {
    formElementsArray.push({
      id: key,
      config: selectedForm[key],
    });
  }

  let form = null;

  if (changableDetail === 'personal') {
    form = (
      <div className={classes.PersonalChange}>
        {' '}
        <form onSubmit={(event) => sendUpdate(event)} className={classes.Form}>
          {formElementsArray.map((input) => {
            return (
              <Input
                flexStyle="row"
                key={input.id}
                type={input.config.inputType}
                name={input.config.name}
                placeholder={input.config.placeholder}
                errorMessage={input.config.errorMessage}
                valid={input.config.valid}
                touched={input.config.touched}
                value={input.config.value}
                changed={(event) => inputChangedHandler(event, input.id)}
              />
            );
          })}
          <AddButton disabled={formValid}>Save</AddButton>
        </form>
      </div>
    );
  }

  if (changableDetail === 'address') {
    form = (
      <div className={classes.AddressChange}>
        {' '}
        <form onSubmit={(event) => sendUpdate(event)} className={classes.Form}>
          {formElementsArray.map((input) => {
            return (
              <Input
                flexStyle="row"
                key={input.id}
                type={input.config.inputType}
                name={input.config.name}
                placeholder={input.config.placeholder}
                errorMessage={input.config.errorMessage}
                valid={input.config.valid}
                touched={input.config.touched}
                value={input.config.value}
                changed={(event) => inputChangedHandler(event, input.id)}
              />
            );
          })}
          <AddButton disabled={formValid}>Save</AddButton>
        </form>
      </div>
    );
  }

  return (
    <div className={classes.MyAccountInfo}>
      {authRedirect}
      <h1 className={classes.Title}> &lsaquo; My Account Info &rsaquo; </h1>
      <MyAccountMenu />
      <div className={classes.Details}>
        <div className={classes.Box}>
          <div className={classes.Change} onClick={() => change('personal')}>
            change
          </div>
          <h2>Personal details:</h2>
          <ul>
            <li>Username: {userDetails.userName}</li>
            <li>E-mail: {userDetails.email}</li>
            <li>First Name: {userDetails.firstName}</li>
            <li>Last Name: {userDetails.lastName}</li>
            <li>Phone: {userDetails.phone}</li>
          </ul>
        </div>

        <div className={classes.Box}>
          <div className={classes.Change} onClick={() => change('address')}>
            change
          </div>
          <h2>Address:</h2>
          <ul>
            <li>Country: {address.country}</li>
            <li>City: {address.city}</li>
            <li>ZIP Code: {address.zipCode}</li>
            <li>Street: {address.street}</li>
          </ul>
        </div>

        {form}
      </div>
    </div>
  );
});

export default MyAccountInfo;
