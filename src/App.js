import React, { Component } from 'react';
import './App.css';

import Layout from './Component/Layout/Layout';
import BurgerBuilder from './Container/BurgerBuilder/BurgerBuilder';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <BurgerBuilder/>
        </Layout>
      </div>
    );
  }
}

export default App;
