import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Product.module.scss';
import AddButton from '../../../../components/UI/AddButton/AddButton';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { IoOpenOutline } from 'react-icons/io5';
import * as actions from '../../../../store/actions';
import { updatePrice } from '../../../../shared/utility';
import Modal from '../../../../components/UI/Modal/Modal';
import ModalSecondary from '../../../../components/UI/ModalSecondary/ModalSecondary';
import SingleProduct from '../../SingleProduct/SingleProduct';
import ProductAdded from '../../ProductAdded/ProductAdded';
import LoginRequired from '../../../../components/Error/LoginRequired/LoginRequired';

const Product = React.memo((props) => {
  const [show, setShow] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
  const [likeWithoutLogin, setLikeWithoutLogin] = useState(false);
  const [like, setLike] = useState(false);

  const token = useSelector((state) => {
    return state.auth.token;
  });

  const userId = useSelector((state) => {
    return state.auth.userId;
  });

  const addedProduct = useSelector((state) => {
    return state.cart.addedProduct;
  });

  const wishlist = useSelector((state) => {
    return state.wishlist.wishlist;
  });

  const dispatch = useDispatch();

  const onAddToCart = (userId, productId, productType) =>
    dispatch(actions.addToCart(userId, productId, productType));

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

  let quantity = null;

  if (props.quantity === 0) {
    quantity = 'Out of Stock';
  } else if (props.quantity === 1) {
    quantity = 'Hurry! Only one left.';
  }

  const modalClose = () => {
    setShowAdded(false);
    onClearAddedProduct();
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
    if (addedProduct && props.id === addedProduct.id) {
      setShowAdded(true);
    } else {
      setShowAdded(false);
    }
  }, [addedProduct, showAdded, props.id]);

  return (
    <React.Fragment>
      <ModalSecondary
        show={likeWithoutLogin}
        newStyle={'list'}
        modalClose={() => setLikeWithoutLogin(false)}
      >
        <LoginRequired
          modalClose={() => setLikeWithoutLogin(false)}
          message={'Please log in to add this product to your wishlist!'}
        />
      </ModalSecondary>

      <ModalSecondary show={showAdded} newStyle={'list'} modalClose={() => modalClose()}>
        <ProductAdded
          modalClose={() => modalClose()}
          name={props.name}
          price={props.price}
          sale={props.sale}
          imageUrl={props.image}
        />
      </ModalSecondary>

      <Modal show={show} modalClose={() => setShow(false)}>
        <SingleProduct
          id={props.id}
          type={props.type}
          modalClose={() => setShow(false)}
        ></SingleProduct>
      </Modal>

      <div className={classes.Product}>
        {props.sale ? (
          <div className={classes.Sale}>
            <span>SALE</span>
            <span>-{props.sale}%</span>{' '}
          </div>
        ) : null}
        <div className={classes.Overlay}>
          {like ? (
            <AiTwotoneHeart
              className={classes.Liked}
              onClick={() => removingToWishlist()}
            />
          ) : (
            <AiOutlineHeart className={classes.Icon} onClick={() => addingToWishlist()} />
          )}

          <IoOpenOutline className={classes.Icon} onClick={() => setShow(true)} />
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
    </React.Fragment>
  );
});

export default Product;
