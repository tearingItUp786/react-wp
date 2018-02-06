// @flow

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { WP_CATEGORIES } from './config';
import Landing from './Landing';
import Search from './Search';
import Article from './Article';
import Fourohfour from './Fourohfour';

type State = {
  searchTerm: string,
  categories: Array<string>,
  categoryValues: Array<*>
};

type Props = {};

class Main extends Component<Props, State> {
  state = {
    searchTerm: '',
    categories: [],
    categoryValues: []
  };

  componentDidMount() {
    axios
      .get(`${WP_CATEGORIES}/`)
      .then((response: { data: Array<*> }) => {
        this.setState({ categories: response.data });
      })
      .catch(error => <h1>{error}</h1>);
  }

  handleSearchTermChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleCategoryChange = (event: SyntheticEvent<*>) => {
    const { options } = event.currentTarget;
    const categoryValues = [];
    for (let i = 0; i < options.length; i += 1) {
      if (options[i].selected) {
        categoryValues.push(options[i].value);
      }
    }
    this.setState({ categoryValues });
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <Landing
              categories={this.state.categories}
              categoryValues={this.state.categoryValues}
              searchTerm={this.state.searchTerm}
              handleSearchTermChange={this.handleSearchTermChange}
              handleCategoryChange={this.handleCategoryChange}
              {...props}
            />
          )}
        />
        <Route path="/search/:searchTerm?/:categories?" component={props => <Search {...props} />} />
        <Route path="/article/:id" component={props => <Article {...props} />} />

        <Route component={Fourohfour} />
      </Switch>
    );
  }
}

export default Main;
