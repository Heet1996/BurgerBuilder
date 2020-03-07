import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import PrivateRoute from './hoc/PrivateRouter/PrivateRouter';


import {Route,Switch,withRouter, Redirect} from 'react-router';

class App extends Component {

  componentDidMount()
  {
    this.props.onAuthAgain();
  }
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <PrivateRoute path="/orders" component={Orders} />
            <Route path="/auth" component={Auth}/>
            <Route  path="/" component={BurgerBuilder} />
            
            
          </Switch>
        </Layout>
      </div>
    );
  }
}

let mapDispatchToProps=(dispatch)=>{
  return {
    onAuthAgain:()=>dispatch(actions.authCheckState())
  }
}




export default withRouter(connect(null,mapDispatchToProps)(App));
//export default App;
