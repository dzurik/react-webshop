import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';
import Home from './containers/Home/Home';
import { products } from './shared/routes.js';

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

function App(props) {
  let routes = (
    <Switch>
      <Route path="/admin" render={(props) => <Admin {...props} />} />
      {products.map((link) => {
        return (
          <Route
            key={link.productType}
            path={'/' + link.title}
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

      <Route path="/signin" render={(props) => <SignIn {...props} />} />
      <Route path="/signup" render={(props) => <SignUp {...props} />} />
      <Route path="/" exact component={Home} />
      <Redirect to="404" />
    </Switch>
  );

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>{routes}</Suspense>
    </Layout>
  );
}

export default withRouter(App);
