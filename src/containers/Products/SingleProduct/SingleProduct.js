import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './SingleProduct.module.scss';
import * as actions from '../../../store/actions';
import { updatePrice } from '../../../shared/utility';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ModalSecondary from '../../../components/UI/ModalSecondary/ModalSecondary';
import AddButton from '../../../components/UI/AddButton/AddButton';
import LoginRequired from '../../../components/Error/LoginRequired/LoginRequired';
import ProductAdded from '../ProductAdded/ProductAdded';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

const SingleProduct = React.memo((props) => {
  const [show, setShow] = useState(false);
  const [like, setLike] = useState(false);
  const [likeWithoutLogin, setLikeWithoutLogin] = useState(false);
  const showRef = useRef(null);

  const dispatch = useDispatch();

  const { id, type } = props;

  const addedProduct = useSelector((state) => {
    return state.cart.addedProduct;
  });

  const token = useSelector((state) => {
    return state.auth.token !== null;
  });

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

  const wishlist = useSelector((state) => {
    return state.wishlist.wishlist;
  });

  const onFetchSingleProduct = useCallback(
    (id, type) => dispatch(actions.fetchSingleProduct(id, type)),
    [dispatch]
  );

  const onAddToCart = (userId, id, type) => dispatch(actions.addToCart(userId, id, type));

  const onClearAddedProduct = () => dispatch(actions.clearAddedProduct());

  const onAddWishlist = (token, userId, productId, productType) =>
    dispatch(actions.addWishlist(token, userId, productId, productType));

  const onRemoveWishlist = (token, userId, productId) =>
    dispatch(actions.removeWishlist(token, userId, productId));

  const addingToWishlist = () => {
    if (token) {
      setLike(true);
      onAddWishlist(token, userId, props.id, props.type);
    } else {
      setLikeWithoutLogin(true);
    }
  };

  const removingToWishlist = () => {
    if (token) {
      setLike(false);
      onRemoveWishlist(token, userId, props.id);
    } else {
      setLikeWithoutLogin(true);
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.length > 0) {
      wishlist.forEach((product) => {
        if (product.id === props.id) {
          setLike(true);
        }
      });
    }
  }, [wishlist, props.id]);

  useEffect(() => {
    if (addedProduct && show !== showRef.current) {
      setShow(true);
    } else {
      setShow(false);
    }

    if (addedProduct) {
      showRef.current = show;
    }
  }, [addedProduct, show]);

  useEffect(() => {
    onFetchSingleProduct(id, type);
  }, [onFetchSingleProduct, id, type]);

  const modalClose = () => {
    setShow(false);
    onClearAddedProduct();
  };

  let item = null;

  if (loading) {
    item = <Spinner />;
  }

  if (error) {
    item = <h1>Something went wrong. Pease Try Again.</h1>;
  }

  let quantity = null;

  if (product && product.details.quantity) {
    quantity = `More than ${product.details.quantity} pieces`;
  }

  if (product && product.details.quantity < 5 && product.details.quantity) {
    quantity = `Less than ${product.details.quantity} pieces left!`;
  }

  if (product && product.details.quantity === 1) {
    quantity = `Hurry!!!, Only ${product.details.quantity} piece left !`;
  }

  if (product && product.details.quantity === 0) {
    quantity = `Sorry, this product is out of stock, Pro-order is available`;
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
          {like ? (
            <p className={classes.Like}>
              <AiTwotoneHeart
                className={classes.Liked}
                onClick={() => removingToWishlist()}
              />{' '}
              Wish
            </p>
          ) : (
            <p className={classes.Like}>
              <AiOutlineHeart
                className={classes.Icon}
                onClick={() => addingToWishlist()}
              />
              Add to wishlist
            </p>
          )}

          <p>
            Price:{' '}
            <span className={classes.Price}>
              {updatePrice(product.details.price, product.details.sale)}
            </span>
          </p>

          <p>Stock: {quantity}</p>

          <p>More Details</p>

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

  return (
    <React.Fragment>
      <ModalSecondary show={show} modalClose={() => modalClose()}>
        {product ? (
          <ProductAdded
            modalClose={() => modalClose()}
            name={product.details.name}
            price={product.details.price}
            sale={product.details.sale}
            imageUrl={product.details.imageUrl}
          />
        ) : null}
      </ModalSecondary>

      <ModalSecondary
        show={likeWithoutLogin}
        modalClose={() => setLikeWithoutLogin(false)}
      >
        <LoginRequired
          modalClose={() => setLikeWithoutLogin(false)}
          message={'Please log in to add this product to your wishlist!'}
        />
      </ModalSecondary>

      <div className={classes.SingleProduct}>
        <IoClose className={classes.CloseButton} onClick={props.modalClose} />
        {item}
      </div>
    </React.Fragment>
  );
});

export default SingleProduct;
