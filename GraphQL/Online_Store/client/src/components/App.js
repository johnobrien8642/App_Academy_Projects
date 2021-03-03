import React from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import ProductIndex from './products/ProductIndex';
import ProductDetail from './products/ProductDetail';
import CreateProduct from './products/CreateProduct';
import Cart from './products/Cart';
import Login from './Login';
import Signup from './Register';
import AuthRoute from '../util/route_util';

const App = () => {

  return (
    <div className="App">
      <Link to='/'><h1>Online Store</h1></Link>
      <Switch>
        <AuthRoute exact path='/login' component={Login} routeType='auth' />
        <AuthRoute exact path='/signup' component={Signup} routeType='auth' />
        <Route exact path='/' component={ProductIndex} />
        <AuthRoute exact path={`/:_id/detail`} component={ProductDetail} />
        <AuthRoute exact path={`/:username/create_new_product`} component={CreateProduct} />
        <AuthRoute exact path={`/:username/cart`} component={Cart} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
