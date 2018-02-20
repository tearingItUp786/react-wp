// @flow

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { getCategories, getUsers } from './config';
import Landing from './Landing';
import Search from './Search';
import Article from './Article';
import Fourohfour from './Fourohfour';

type State = {
  searchTerm: string,
  categories: Array<string>,
  categoryValues: Array<*>,
  authors: Array<string>,
  authorValues: Array<*>
};

type Props = {};

class Main extends Component<Props, State> {
  state = {
    searchTerm: '',
    categories: [],
    categoryValues: [],
    authors: [],
    authorValues: []
  };

  componentDidMount() {
    axios.all([getCategories(), getUsers()]).then(
      axios.spread((categories, authors) => {
        this.setState({
          categories: categories.data,
          authors: authors.data
        });
      })
    );
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

  handleAuthorChange = (event: SyntheticEvent<*>) => {
    const { options } = event.currentTarget;
    const authorValues = [];
    for (let i = 0; i < options.length; i += 1) {
      if (options[i].selected) {
        authorValues.push(options[i].value);
      }
    }
    this.setState({ authorValues });
  };

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Landing
                searchTerm={this.state.searchTerm}
                categories={this.state.categories}
                categoryValues={this.state.categoryValues}
                handleSearchTermChange={this.handleSearchTermChange}
                handleCategoryChange={this.handleCategoryChange}
                authors={this.state.authors}
                authorValues={this.state.authorValues}
                handleAuthorChange={this.handleAuthorChange}
                {...props}
              />
            )}
          />
          <Route path="/search" component={props => <Search {...props} />} />
          <Route path="/article/:id" component={props => <Article {...props} />} />

          <Route component={Fourohfour} />
        </Switch>
      </div>
    );
  }
}

export default Main;
