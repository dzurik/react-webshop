import React from 'react';
import { Link } from 'react-router-dom';

import classes from './ProductAdded.module.scss';
import Button from '../../../components/UI/Button/Button';
import ButtonSecondary from '../../../components/UI/ButtonSecondary/ButtonSecondary';
import { updatePrice } from '../../../shared/utility';

const ProductAdded = React.memo((props) => {
  return (
    <div className={classes.ProductAdded}>
      <h2 className={classes.Title}>The product was successfully added to the cart!</h2>
      <div className={classes.Body}>
        <img src={props.imageUrl} alt={props.name} />
        <div className={classes.Details}>
          <h3>{props.name}</h3>
          <p>
            Price: <span>{updatePrice(props.price, props.sale)}</span>
          </p>
        </div>
      </div>
      <div className={classes.Bottom}>
        <ButtonSecondary clicked={props.modalClose}>Continue shopping</ButtonSecondary>
        <Link to="/cart">
          <Button clicked={props.modalClose}>To the shopping cart</Button>
        </Link>
      </div>
    </div>
  );
});

export default ProductAdded;
