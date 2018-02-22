// @flow

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { getCategories, getUsers } from './config';
import Landing from './Landing';
import Search from './Search';
import Article from './Article';
import Fourohfour from './Fourohfour';
import Header from './Header';

type State = {
  searchTerm: string,
  categories: Array<string>,
  categoryValues: Array<*>,
  authors: Array<string>,
  authorValues: Array<*>,
  pageNumber: number
};

type Props = {};

class Main extends Component<Props, State> {
  state = {
    searchTerm: '',
    categories: [],
    categoryValues: [],
    authors: [],
    authorValues: [],
    pageNumber: 1
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

  updatePageNumber = (newPageNumber: number) => {
    this.setState({ pageNumber: newPageNumber });
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

  createLinkForSearch = (pageNumber: number, searchTerm: string, categories: Array<*>, authors: Array<*>) => {
    let historyPushValue = `/search?searchTerm=${searchTerm}`;

    let stringOfCategories = categories.map(currentCategory => currentCategory.toString());
    let stringOfAuthors = authors.map(currentAuthor => currentAuthor.toString());

    stringOfAuthors = stringOfAuthors.toString();
    stringOfCategories = stringOfCategories.toString();

    console.log(stringOfCategories);

    if (stringOfCategories !== '') {
      historyPushValue = `${historyPushValue}&categories=${stringOfCategories}`;
    }

    if (stringOfAuthors !== '') {
      historyPushValue = `${historyPushValue}&author=${stringOfAuthors}`;
    }

    historyPushValue = `${historyPushValue}&page=${pageNumber}`;

    return historyPushValue;
  };

  render() {
    return (
      <div>
        <Header
          searchTerm={this.state.searchTerm}
          categoryValues={this.state.categoryValues}
          authorValues={this.state.authorValues}
          pageNumber={this.state.pageNumber}
          createLinkForSearch={this.createLinkForSearch}
        />
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
                pageNumber={this.state.pageNumber}
                {...props}
              />
            )}
          />
          <Route
            path="/search"
            component={props => (
              <Search pageNumber={this.state.pageNumber} updatePageNumber={this.updatePageNumber} {...props} />
            )}
          />
          <Route path="/article/:id" component={props => <Article {...props} />} />

          <Route component={Fourohfour} />
        </Switch>
      </div>
    );
  }
}

export default Main;
