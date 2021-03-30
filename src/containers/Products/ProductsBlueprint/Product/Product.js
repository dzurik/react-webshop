import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Product.module.scss';
import AddButton from '../../../../components/UI/AddButton/AddButton';
import { FcLikePlaceholder } from 'react-icons/fc';
// import { FcLike } from 'react-icons/fc';
import { IoOpenOutline } from 'react-icons/io5';
import * as actions from '../../../../store/actions';

const Product = (props) => {
  const userId = useSelector((state) => {
    return state.auth.userId;
  });

  const dispatch = useDispatch();

  const onAddToCart = (userId, productId, productType) =>
    dispatch(actions.addToCart(userId, productId, productType));

  let updatePrice = (price, sale) => {
    let number = price;
    let updatedSale = sale / 100;

    if (sale) {
      number = number - number * updatedSale;
    }

    number = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(number);
    return number;
  };

  let quantity = null;

  if (props.quantity === 0) {
    quantity = 'Out of Stock';
  } else if (props.quantity === 1) {
    quantity = 'Hurry! Only one left.';
  }

  return (
    <div className={classes.Product}>
      {props.sale ? (
        <div className={classes.Sale}>
          <span>SALE</span>
          <span>-{props.sale}%</span>{' '}
        </div>
      ) : null}
      <div className={classes.Overlay}>
        <FcLikePlaceholder className={[classes.Icon, classes.IconWhite].join(' ')} />
        <IoOpenOutline className={classes.Icon} />
      </div>
      <div className={classes.ProductImage}>
        <img src={props.image} alt={props.name} />
      </div>
      <div className={classes.ProductBody}>
        <p className={classes.Name}>{props.name}</p>
        {quantity ? <p className={classes.Quantity}>{quantity}</p> : null}
        <div className={classes.Cart}>
          {props.sale ? (
            <h2 className={classes.Price}>
              {updatePrice(props.price, props.sale)}
              <span>{updatePrice(props.price, false)}</span>
            </h2>
          ) : (
            <h2 className={classes.Price}>{updatePrice(props.price, props.sale)}</h2>
          )}

          <AddButton
            comp={'Product'}
            disabled
            clicked={() => onAddToCart(userId, props.id, props.type)}
          >
            Into Cart
          </AddButton>
        </div>
      </div>
    </div>
  );
};

export default Product;
