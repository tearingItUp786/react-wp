// @flow

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import Search from './Search';
import Fourohfour from './Fourohfour';

class Main extends Component<{}, { searchTerm: string }> {
  state = {
    searchTerm: ''
  };

  handleSearchTermChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Landing
                searchTerm={this.state.searchTerm}
                handleSearchTermChange={this.handleSearchTermChange}
                {...props}
              />
            )}
          />
          <Route exact path="/search" component={ (props) => <Search searchTerm={this.state.searchTerm} {...props} />} />
          <Route component={Fourohfour} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Main;
