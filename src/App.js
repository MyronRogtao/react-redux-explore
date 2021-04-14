import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import LogOut from './containers/Auth/Logout/Logout';
import Layout from "./containers/Layout/Layout";
import { useSelector } from 'react-redux';

const BurgerBuilder = React.lazy(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));

const App = () => {
  const token = useSelector(store => store.auth.token);
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/burger" render={lazyGuardedRoute(BurgerBuilder, token)} />
          <Route path="/check-out" render={lazyGuardedRoute(Checkout, token)} />
          <Route path="/orders" render={lazyGuardedRoute(Orders, token)} />
          <Route path="/logout" component={LogOut} />
          <Route render={() => <h1>Page Not Found</h1>} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

const lazyGuardedRoute = (C, token) => {
  return (props) => (
    <Suspense fallback={<div>Loading....</div>}>
      { token ? <C {...props}/> : <Redirect to='/' /> }
    </Suspense>
  )
}

export default App;
