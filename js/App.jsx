// @flow

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './Main';

const App = () => (
  <BrowserRouter>
    <div className="container-fluid">
      <Main />
    </div>
  </BrowserRouter>
);

export default App;
