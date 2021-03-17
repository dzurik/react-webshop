import React, { Suspense } from 'react';
// import classes from './App.module.scss';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';
import Home from './containers/Home/Home';

const Phones = React.lazy(() => {
  return import('./containers/Products/Phones/Phones');
});

const Laptops = React.lazy(() => {
  return import('./containers/Products/Laptops/Laptops');
});

const Computers = React.lazy(() => {
  return import('./containers/Products/Computers/Computers');
});

const Admin = React.lazy(() => {
  return import('./components/Admin/Admin');
});

function App(props) {
  let routes = (
    <Switch>
      <Route path="/admin" render={(props) => <Admin {...props} />} />
      <Route path="/phones" render={(props) => <Phones {...props} />} />
      <Route path="/laptops" render={(props) => <Laptops {...props} />} />
      <Route path="/computers" render={(props) => <Computers {...props} />} />
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
