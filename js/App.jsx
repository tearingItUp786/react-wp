// @flow

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './Main';
import Header from './Header';

const App = () => (
  <BrowserRouter>
    <div className="container-fluid">
      <Header />
      <Main />
    </div>
  </BrowserRouter>
);

export default App;
