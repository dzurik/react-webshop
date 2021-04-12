import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './NavWishList.module.scss';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';

const NavWishList = React.memo((props) => {
  const wishlist = useSelector((state) => {
    return state.wishlist.wishlist;
  });

  return (
    <Link to="/wishlist">
      <div className={classes.NavWishList}>
        <div className={classes.Counter}>{wishlist ? wishlist.length : 0}</div>

        {wishlist.length === 0 ? (
          <AiOutlineHeart className={classes.Wish} />
        ) : (
          <AiTwotoneHeart className={classes.Liked} />
        )}
      </div>
    </Link>
  );
});

export default NavWishList;
