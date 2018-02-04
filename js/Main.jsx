// @flow

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import Search from './Search';
import Fourohfour from './Fourohfour';

type State = {
  searchTerm: string
};

class Main extends Component<{}, State> {
  state = {
    searchTerm: ''
  };

  props: {
    categories: Array<*>
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
                categories={this.props.categories}
                searchTerm={this.state.searchTerm}
                handleSearchTermChange={this.handleSearchTermChange}
                {...props}
              />
            )}
          />
          <Route path="/search/:category?" component={props => <Search searchTerm={this.state.searchTerm} {...props} />} />
          <Route component={Fourohfour} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Main;
