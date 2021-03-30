import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Cart.module.scss';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import CartProduct from './CartProduct/CartProduct';

const Cart = (props) => {
  const loading = useSelector((state) => {
    return state.cart.loading;
  });

  const fullDetailedCart = useSelector((state) => {
    return state.cart.fullDetailedCart;
  });

  const token = useSelector((state) => {
    return state.auth.token;
  });

  const userId = useSelector((state) => {
    return state.auth.userId;
  });

  const dispatch = useDispatch();

  const onClearCart = (token, userId) =>
    dispatch(actions.clearCart(token, userId), [dispatch]);

  let products = null;

  if (loading) products = <Spinner />;
  if (fullDetailedCart && fullDetailedCart.length > 0) {
    products = fullDetailedCart.map((product) => {
      return (
        <CartProduct
          key={product.id + Math.random()}
          quantity={product.quantity}
          details={product.details}
        />
      );
    });
  }

  if (!loading && fullDetailedCart && fullDetailedCart.length === 0) {
    products = <h2>Your cart is empty!</h2>;
  }

  return (
    <div className={classes.Cart}>
      <h3>
        <Link to="/" className={classes.Link}>
          Home
        </Link>{' '}
        / Cart
      </h3>

      <h1>Contents of the cart:</h1>

      <button onClick={() => onClearCart(token, userId)}>Delete All Items</button>
      <hr />
      <div className={classes.Content}>{products}</div>
    </div>
  );
};

export default Cart;
