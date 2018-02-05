// @flow

import React, { Component } from 'react';
import type { Match } from 'react-router-dom';
import axios from 'axios';
import { WP_POSTS } from './config';
import ArticleCard from './ArticleCard';

type Props = {
  searchTerm: string,
  match: Match
};

type State = {
  data: Array<*>
};

class Search extends Component<Props, State> {
  state = {
    data: []
  };

  componentDidMount() {
    const { match } = this.props;
    let searchURL = `${WP_POSTS}?per_page=3`;

    if (match.params.category !== undefined && match.params.category !== null) {
      const categoriesString = match.params.category.toString();
      searchURL = `${searchURL}&categories=${categoriesString}`;
    }

    axios
      .get(searchURL)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <h1>{this.props.match.params.category}</h1>
          <h1>Search</h1>
          <h2>{this.props.searchTerm}</h2>
          {this.state.data.map(currentArticle => <ArticleCard key={currentArticle.id} {...currentArticle} />)}
        </div>
      </div>
    );
  }
}
export default Search;
