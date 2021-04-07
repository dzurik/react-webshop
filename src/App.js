import React, { useEffect, Suspense, useCallback, useRef } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';
import Home from './containers/Home/Home';
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

const CustomerInfo = React.lazy(() => {
  return import('./containers/MyAccount/CustomerInfo/CustomerInfo');
});

const WishList = React.lazy(() => {
  return import('./containers/MyAccount/WishList/WishList');
});

const Cart = React.lazy(() => {
  return import('./containers/Cart/Cart');
});

function App() {
  const dispatch = useDispatch();

  const onCheckAuthStatus = useCallback(() => dispatch(actions.checkAuthStatus()), [
    dispatch,
  ]);
  const onFetchCart = useCallback((token) => dispatch(actions.fetchCart(token)), [
    dispatch,
  ]);

  const cart = useSelector((state) => {
    return state.cart.cart;
  });

  const shallowCart = useSelector((state) => {
    return state.cart.shallowCart;
  });

  const token = useSelector((state) => {
    return state.auth.token;
  });

  const onLoadShallowCart = useCallback(
    (cart, shallowCart) => dispatch(actions.loadShallowCart(cart, shallowCart)),
    [dispatch]
  );

  const onLoadCart = useCallback(
    (cart, shallowCart) => dispatch(actions.loadCart(cart, shallowCart)),
    [dispatch]
  );

  const tokenRef = useRef(token);

  useEffect(() => {
    onCheckAuthStatus();
    if (tokenRef.current === null || token !== tokenRef.current) {
      onFetchCart(token);
    }
    tokenRef.current = token;
  }, [onCheckAuthStatus, onFetchCart, token]);

  const shallowRef = useRef(shallowCart);

  useEffect(() => {
    if (
      cart.length > 0 &&
      cart.length > shallowRef.current.length &&
      shallowCart.length === shallowRef.current.length
    ) {
      onLoadShallowCart(cart);
    }
    shallowRef.current = shallowCart;

    if (cart.length > 0 && cart.length === shallowCart.length) {
      onLoadCart(shallowCart);
    }
  }, [onLoadShallowCart, onLoadCart, cart, shallowCart]);

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

      <Route path="/myaccount" exact render={(props) => <CustomerInfo {...props} />} />
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

      <Route
        path="/myaccount/wishlist"
        exact
        render={(props) => <WishList {...props} />}
      />
      <Route path="/logout" exact component={Logout} />
      <Route path="/" exact component={Home} />
      <Redirect to="404" />
    </Switch>
  );

  // if (isAuthenticated) {
  //   routes = (
  //     <Switch>
  //       <Route path="/admin" render={(props) => <Admin {...props} />} />
  //       {products.map((link) => {
  //         return (
  //           <Route
  //             key={link.productType}
  //             exact
  //             path={link.component ? `/computers/(${link.link})?` : '/' + link.link}
  //             render={(props) => (
  //               <ProductsBlueprint
  //                 productType={link.productType}
  //                 title={link.title}
  //                 {...props}
  //               />
  //             )}
  //           />
  //         );
  //       })}

  //       <Route path="/signin" render={(props) => <SignIn {...props} />} />
  //       <Route path="/signup" render={(props) => <SignUp {...props} />} />

  //       <Route path="/myaccount" render={(props) => <MyAccountInterface {...props} />} />
  //       <Route path="/myaccount/orders?" render={(props) => <Orders {...props} />} />
  //       <Route
  //         path="/myaccount/(info)?"
  //         render={(props) => <MyAccountInfo {...props} />}
  //       />
  //       <Route
  //         path="/myaccount/(customerinfo)?"
  //         render={(props) => <CustomerInfo {...props} />}
  //       />
  //       <Route
  //         path="/myaccount/(wishlist)?"
  //         render={(props) => <WishList {...props} />}
  //       />
  //       <Route path="/" exact component={Home} />
  //       <Redirect to="404" />
  //     </Switch>
  //   );
  // }

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>{routes}</Suspense>
    </Layout>
  );
}

export default withRouter(App);
