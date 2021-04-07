import { useSelector, useDispatch } from 'react-redux';

import classes from './CartProduct.module.scss';
import { updatePrice } from '../../../shared/utility';
import * as actions from '../../../store/actions';
import { IoClose } from 'react-icons/io5';

const CartProduct = (props) => {
  const userId = useSelector((state) => {
    return state.auth.userId;
  });

  const cart = useSelector((state) => {
    return state.cart.cart;
  });

  const dispatch = useDispatch();

  const onAddToCart = (userId, productId, productType) =>
    dispatch(actions.addToCart(userId, productId, productType));

  const onRemoveFromCart = (userId, productId, cart) =>
    dispatch(actions.removeFromCart(userId, productId, cart));

  const onRemoveFullItemFromCart = (userId, productId, cart) =>
    dispatch(actions.removeFullItemFromCart(userId, productId, cart));

  let minusClasses = [classes.Minus];

  if (props.quantity === 1) {
    minusClasses.push(classes.Ignore);
  }

  return (
    <div className={classes.CartProduct}>
      <div className={classes.Delete}>
        <IoClose onClick={() => onRemoveFullItemFromCart(userId, props.id, cart)} />
      </div>
      <div className={classes.Image}>
        <img src={props.details.imageUrl} alt={props.details.name} />
      </div>
      <div className={classes.Body}>{props.details.name}</div>
      <div className={classes.Quantity}>
        <div
          className={minusClasses.join(' ')}
          onClick={() => onRemoveFromCart(userId, props.id, cart)}
        >
          &#x2212;
        </div>
        <span>{props.quantity}</span>
        <div
          className={classes.Plus}
          onClick={() => onAddToCart(userId, props.id, props.type)}
        >
          &#x2b;
        </div>
      </div>
      <div className={classes.Price}>
        {updatePrice(props.details.price, props.details.sale)}
      </div>
      <div className={classes.Details}>Details</div>
    </div>
  );
};

export default CartProduct;
