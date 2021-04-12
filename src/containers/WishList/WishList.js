import React from 'react';
import { Link } from 'react-router-dom';

import classes from './WishList.module.scss';
import DeleteButton from '../../components/UI/DeleteButton/DeleteButton';

const WishList = (props) => {
  let list = null;

  if (list && list.length === 0) {
    list = 'There are currently no items on your wish list.';
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

        <DeleteButton clicked={() => {}}>Delete All Items</DeleteButton>
      </div>
      <hr />
      <div className={classes.Content}>{list}</div>
    </div>
  );
};

export default WishList;
