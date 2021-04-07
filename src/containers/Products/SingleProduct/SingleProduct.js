import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './SingleProduct.module.scss';
import * as actions from '../../../store/actions';
import { updatePrice } from '../../../shared/utility';
import Spinner from '../../../components/UI/Spinner/Spinner';
import AddButton from '../../../components/UI/AddButton/AddButton';

const SingleProduct = (props) => {
  const dispatch = useDispatch();

  const { id, type } = props;

  const userId = useSelector((state) => {
    return state.auth.userId;
  });

  const loading = useSelector((state) => {
    return state.products.productLoading;
  });

  const error = useSelector((state) => {
    return state.products.productError;
  });

  const product = useSelector((state) => {
    return state.products.product;
  });

  const onFetchSingleProduct = useCallback(
    (id, type) => dispatch(actions.fetchSingleProduct(id, type)),
    [dispatch]
  );

  const onAddToCart = (userId, id, type) => dispatch(actions.addToCart(userId, id, type));

  useEffect(() => {
    onFetchSingleProduct(id, type);
  }, [onFetchSingleProduct, id, type]);

  let item = null;

  if (loading) {
    item = <Spinner />;
  }

  if (error) {
    item = <h1>Something went wrong. Pease Try Again.</h1>;
  }

  let quantity = null;

  if (product && product.details.quantity) {
    quantity = `More than ${product.details.quantity} piece`;
  }

  if (product && product.details.quantity < 5 && product.details.quantity) {
    quantity = `Only ${product.details.quantity} piece left!`;
  }

  if (product && product.details.quantity === 1) {
    quantity = `Hurry!!!, Only ${product.details.quantity} left !`;
  }

  if (product && product.details.quantity === 0) {
    quantity = `Sorry, this product is not in stock, Pro-order is available`;
  }

  if (product) {
    item = (
      <React.Fragment>
        <div className={classes.Image}>
          {product.details.sale ? (
            <div className={classes.Sale}>
              <span>SALE</span>
              <span>-{product.details.sale}%</span>{' '}
            </div>
          ) : null}
          <img src={product.details.imageUrl} alt={product.details.name} />
        </div>
        <div className={classes.Body}>
          <h2>{product.details.name}</h2>

          <p>
            Price:{' '}
            <span className={classes.Price}>
              {updatePrice(product.details.price, product.details.sale)}
            </span>
          </p>

          <p>Stock: {quantity}</p>

          <AddButton
            className={classes.Button}
            comp={'Modal'}
            disabled
            clicked={() => onAddToCart(userId, id, type)}
          >
            Into Cart
          </AddButton>
        </div>
      </React.Fragment>
    );
  }

  return <div className={classes.SingleProduct}>{item}</div>;
};

export default SingleProduct;
