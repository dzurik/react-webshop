import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './NavCart.module.scss';
import { RiShoppingCart2Line } from 'react-icons/ri';

const NavCart = () => {
  const cartItems = useSelector((state) => {
    return state.cart.fullDetailedCart;
  });

  return (
    <Link to="/cart">
      <div className={classes.NavCart}>
        <div className={classes.Counter}>{cartItems ? cartItems.length : 0}</div>
        <RiShoppingCart2Line className={classes.Cart} />
      </div>
    </Link>
  );
};

export default NavCart;
