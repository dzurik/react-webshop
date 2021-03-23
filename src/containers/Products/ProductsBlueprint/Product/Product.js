import React from 'react';
import classes from './Product.module.scss';
import AddButton from '../../../../components/UI/AddButton/AddButton';
import { FcLikePlaceholder } from 'react-icons/fc';
// import { FcLike } from 'react-icons/fc';
import { IoOpenOutline } from 'react-icons/io5';
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
      <div className={classes.Overlay}>
        <FcLikePlaceholder className={[classes.Icon, classes.IconWhite].join(' ')} />
        <IoOpenOutline className={classes.Icon} />
      </div>
      <div className={classes.ProductImage}>
        <img src={props.image} alt={props.name} />
      </div>
      <div className={classes.ProductBody}>
        <p className={classes.Name}>{props.name}</p>
        <div className={classes.Cart}>
          <h2 className={classes.Price}>{updatePrice(props.price)}</h2>
          <AddButton borderRadius={true} disabled={true}>
            Into Cart
          </AddButton>
        </div>
      </div>
    </div>
  );
};

export default Product;
