import classes from './CartProduct.module.scss';
import React from 'react';

const CartProduct = (props) => {
  return (
    <div className={classes.CartProduct}>
      <div className={classes.Image}>
        <img src={props.details.imageUrl} alt={props.details.name} />
      </div>
      <div className={classes.Body}>{props.details.name}</div>
      <div className={classes.Quantity}>quantity: {props.quantity}</div>
      <div className={classes.Price}>{props.details.price}</div>
      <div className={classes.Details}>Product Page</div>
    </div>
  );
};

export default CartProduct;
