import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './AddProducts.module.scss';
import Input from '../../../components/UI/Input/Input';
import {
  phone,
  laptop,
  computer,
  processor,
  graphicsCard,
  motherboard,
  memory,
  powerSupply,
  hardDrive,
} from './ProductsBlueprint';
import AddButton from '../../../components/UI/AddButton/AddButton';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { checkValidity, updateObject } from '../../../shared/utility';
import * as actions from '../../../store/actions';

const AddProducts = (props) => {
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedForm, setSelectedForm] = useState({});
  const [formValid, setFormValid] = useState(false);
  const dispatch = useDispatch();

  const loading = useSelector((state) => {
    return state.admin.addLoading;
  });

  const success = useSelector((state) => {
    return state.admin.addSuccess;
  });

  const error = useSelector((state) => {
    return state.admin.addError;
  });

  const onAddProduct = (productDetails, productType) =>
    dispatch(actions.addProduct(productDetails, productType));

  const onAddNewProduct = () => dispatch(actions.addNewProduct());

  const formElementsArray = [];

  useEffect(() => {
    if (selectedProductType === 'phone') {
      setSelectedForm(phone);
    } else if (selectedProductType === 'laptop') {
      setSelectedForm(laptop);
    } else if (selectedProductType === 'computer') {
      setSelectedForm(computer);
    } else if (selectedProductType === 'graphicsCard') {
      setSelectedForm(graphicsCard);
    } else if (selectedProductType === 'motherboard') {
      setSelectedForm(motherboard);
    } else if (selectedProductType === 'memory') {
      setSelectedForm(memory);
    } else if (selectedProductType === 'powerSupply') {
      setSelectedForm(powerSupply);
    } else if (selectedProductType === 'hardDrive') {
      setSelectedForm(hardDrive);
    } else if (selectedProductType === 'processor') {
      setSelectedForm(processor);
    }
  }, [selectedProductType]);

  const resetState = () => {
    setSelectedProductType('default');
    setSelectedForm({});
    setFormValid(false);
  };

  const addNewProductHandler = () => {
    resetState();
    onAddNewProduct();
  };

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

  const AddProductHandler = (event) => {
    event.preventDefault();

    let updatedForm = {};

    Object.keys(selectedForm).forEach((key) => {
      updatedForm[key] = selectedForm[key].value;
    });

    onAddProduct(updatedForm, selectedProductType);
  };

  for (let key in selectedForm) {
    formElementsArray.push({
      id: key,
      config: selectedForm[key],
    });
  }

  let form;

  if (selectedProductType) {
    form = (
      <form onSubmit={AddProductHandler} className={classes.Content}>
        {formElementsArray.map((input) => {
          return (
            <Input
              key={input.id}
              type={input.config.inputType}
              name={input.config.name}
              options={input.config.options}
              placeholder={input.config.placeholder}
              errorMessage={input.config.errorMessage}
              valid={input.config.valid}
              touched={input.config.touched}
              value={input.config.value}
              changed={(event) => inputChangedHandler(event, input.id)}
            />
          );
        })}
        <AddButton disabled={formValid}>add {selectedProductType}</AddButton>
      </form>
    );
  }

  let message = null;

  if (error) {
    message = (
      <div className={classes.Message}>
        <h2 className={classes.Error}>
          Something went wrong while {selectedProductType} has been added to its database.
          Please try again!
        </h2>

        <AddButton disabled={true} clicked={() => addNewProductHandler()}>
          Add New Product
        </AddButton>
      </div>
    );
  } else if (success) {
    message = (
      <div className={classes.Message}>
        <h2 className={classes.Success}>
          <span> {selectedProductType}</span> has been successfully added to its database.
        </h2>

        <AddButton disabled={true} clicked={() => addNewProductHandler()}>
          Add New Product
        </AddButton>
      </div>
    );
  }

  if (loading) {
    form = <Spinner className={classes.Spinner} />;
  }

  return (
    <div className={classes.AddProducts}>
      {message ? (
        message
      ) : (
        <React.Fragment>
          <label name="products">Select product type: </label>
          <select
            name="products"
            defaultValue="default"
            onChange={(event) => setSelectedProductType(event.target.value)}
          >
            <option value="default" disabled>
              Choose type
            </option>
            <option value="phone">Phone</option>
            <option value="laptop">Laptop</option>
            <option value="computer">Computer</option>
            <option value="processor">Processor</option>
            <option value="graphicsCard">Graphics Card</option>
            <option value="motherboard">Motherboard</option>
            <option value="memory">Memory</option>
            <option value="hardDrive">Hard Drive</option>
            <option value="powerSupply">Power Supply Unit</option>
          </select>

          {selectedProductType !== 'default' ? form : null}
        </React.Fragment>
      )}
    </div>
  );
};

export default AddProducts;
