import React, { Component } from 'react';
import './App.css';

import Layout from './Component/Layout/Layout';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <p>Text</p>
        </Layout>
      </div>
    );
  }
}

export default App;
