// @flow

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing';

class App extends Component {
  state = {
    searchTerm: ''
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} searchTerm={this.state.searchTerm} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
