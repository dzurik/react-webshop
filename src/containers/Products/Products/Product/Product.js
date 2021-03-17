import React from 'react';
import classes from './Product.module.scss';

const Product = (props) => {
  let updatePrice = (price) => {
    let number = price;
    number = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(number);
    return number;
  };

  return (
    <div className={classes.Product}>
      <div className={classes.ProductTop}>
        <img src={props.image} alt={props.name} />
      </div>
      <div className={classes.ProductBottom}>
        <p className={classes.Name}>{props.name}</p>
        <h2 className={classes.Price}>{updatePrice(props.price)}</h2>
      </div>
    </div>
  );
};

export default Product;
