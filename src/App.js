import React, { useEffect, Suspense, useCallback, useRef } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';
import Home from './components/Home/Home';
import FourOFourError from './components/FourOFourError/FourOFourError';
import Logout from './containers/Authentication/Logout/Logout';
import { products } from './shared/routes';
import * as actions from './store/actions';

const ProductsBlueprint = React.lazy(() => {
  return import('./containers/Products/ProductsBlueprint/ProductsBlueprint');
});

const Admin = React.lazy(() => {
  return import('./components/Admin/Admin');
});

const SignIn = React.lazy(() => {
  return import('./containers/Authentication/SignIn/SignIn');
});

const SignUp = React.lazy(() => {
  return import('./containers/Authentication/SignUp/SignUp');
});

const MyAccountInfo = React.lazy(() => {
  return import('./containers/MyAccount/MyAccountInfo/MyAccountInfo');
});

const Orders = React.lazy(() => {
  return import('./containers/MyAccount/Orders/Orders');
});

const MyAccount = React.lazy(() => {
  return import('./containers/MyAccount/MyAccount');
});

const WishList = React.lazy(() => {
  return import('./containers/WishList/WishList');
});

const Cart = React.lazy(() => {
  return import('./containers/Cart/Cart');
});

function App() {
  const cart = useSelector((state) => {
    return state.cart.cart;
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

  const loadCart = useSelector((state) => {
    return state.cart.loadCart;
  });

  const tokenRef = useRef(token);

  const dispatch = useDispatch();

  const onCheckAuthStatus = useCallback(() => dispatch(actions.checkAuthStatus()), [
    dispatch,
  ]);
  const onFetchCart = useCallback((token) => dispatch(actions.fetchCart(token)), [
    dispatch,
  ]);

  const onFetchWishlist = useCallback(
    (userId) => dispatch(actions.fetchWishlist(userId)),
    [dispatch]
  );

  const onLoadCart = useCallback((cart) => dispatch(actions.loadCart(cart)), [dispatch]);

  useEffect(() => {
    onCheckAuthStatus();
  }, [onCheckAuthStatus]);

  useEffect(() => {
    if (tokenRef.current === null || token !== tokenRef.current) {
      onFetchCart(token);
    }
    tokenRef.current = token;
  }, [onFetchCart, token]);

  useEffect(() => {
    if (token) {
      onFetchWishlist(userId);
    }
  }, [onFetchWishlist, token, userId]);

  let cartRef = useRef(null);

  useEffect(() => {
    if (
      loadCart ||
      (cart.length > 0 &&
        fullDetailedCart.length === 0 &&
        cart.length !== cartRef.current.length)
    ) {
      console.log('loadcart');
      onLoadCart(cart);
    }

    cartRef.current = cart;
  }, [onLoadCart, loadCart, cart, fullDetailedCart]);

  let routes = (
    <Switch>
      {products.map((link) => {
        return (
          <Route
            key={link.productType}
            exact
            path={link.component ? `/computers/(${link.link})?` : '/' + link.link}
            render={(props) => (
              <ProductsBlueprint
                productType={link.productType}
                title={link.title}
                {...props}
              />
            )}
          />
        );
      })}

      <Route path="/admin" render={(props) => <Admin {...props} />} />
      <Route path="/cart" render={(props) => <Cart {...props} />} />
      <Route path="/signin" render={(props) => <SignIn {...props} />} />
      <Route path="/signup" render={(props) => <SignUp {...props} />} />

      <Route path="/myaccount" exact render={(props) => <MyAccount {...props} />} />
      <Route
        path="/myaccount/(info)?"
        exact
        render={(props) => <MyAccountInfo {...props} />}
      />
      <Route
        path="/myaccount/(orders)?"
        exact
        render={(props) => <Orders {...props} />}
      />

      <Route path="/wishlist" exact render={(props) => <WishList {...props} />} />
      <Route path="/404" exact component={FourOFourError} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/" exact component={Home} />
      <Redirect to="/404" />
    </Switch>
  );

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>{routes}</Suspense>
    </Layout>
  );
}

export default withRouter(App);
