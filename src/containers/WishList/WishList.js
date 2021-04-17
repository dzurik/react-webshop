import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import classes from './WishList.module.scss';
import DeleteButton from '../../components/UI/DeleteButton/DeleteButton';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';
import Product from '../Products/ProductsBlueprint/Product/Product';

const WishList = React.memo((props) => {
  const wishlist = useSelector((state) => {
    return state.wishlist.wishlist;
  });

  const wishlistDetailed = useSelector((state) => {
    return state.wishlist.wishlistDetailed;
  });

  const loading = useSelector((state) => {
    return state.wishlist.loading;
  });

  const token = useSelector((state) => {
    return state.auth.token !== null;
  });

  const userId = useSelector((state) => {
    return state.auth.userId;
  });

  const dispatch = useDispatch();

  const onLoadWishlist = useCallback(
    (wishlist) => dispatch(actions.loadWishlist(wishlist)),
    [dispatch]
  );

  const onClearWishlist = (token, userId) =>
    dispatch(actions.clearWishlist(token, userId));

  const cartSort = (cart) => {
    let sortedCart;
    sortedCart = cart.sort((a, b) => {
      if (a.type < b.type) return -1;
      return 1;
    });
    return sortedCart;
  };

  useEffect(() => {
    if (wishlist) {
      onLoadWishlist(wishlist);
    }
  }, [onLoadWishlist, wishlist]);

  let list = null;

  if (loading) {
    list = <Spinner />;
  }

  if (wishlist && wishlist.length === 0) {
    list = (
      <p className={classes.Message}>There are currently no items on your wish list.</p>
    );
  }

  if (!userId) {
    list = <p className={classes.Message}>You need to sign in first.</p>;
  }

  if (wishlistDetailed.length > 0 && wishlistDetailed.length === wishlist.length) {
    list = cartSort(wishlistDetailed).map((product) => {
      return (
        <Product
          key={product.id}
          id={product.id}
          type={product.type}
          name={product.details.name}
          image={product.details.imageUrl}
          price={+product.details.price}
          sale={+product.details.sale}
          quantity={+product.details.quantity}
        />
      );
    });
  }

  return (
    <div className={classes.WishList}>
      <h3>
        <Link to="/" className={classes.Link}>
          Home
        </Link>{' '}
        / Wishlist
      </h3>
      <div className={classes.Title}>
        <h1>Wishlist</h1>

        <DeleteButton clicked={() => onClearWishlist(token, userId)}>
          Delete All Items
        </DeleteButton>
      </div>
      <hr />
      <div className={classes.Content}>{list}</div>
    </div>
  );
});

export default WishList;
