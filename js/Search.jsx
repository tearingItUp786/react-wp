// @flow

import React, { Component } from 'react';
import type { Match, Location } from 'react-router-dom';
import axios from 'axios';
import { constructWordPressPostURL } from './config';
import ArticleCard from './ArticleCard';

type Props = {
  location: Location,
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
    const params = new URLSearchParams(this.props.location.search);
    let searchTerm;
    let categories;
    let authors;
    const perPage = 5;

    if (params.get('searchTerm') !== null) {
      searchTerm = params.get('searchTerm');
    }

    if (params.get('categories') !== null) {
      categories = params.get('categories');
    }

    if (params.get('author') !== null) {
      authors = params.get('author');
    }

    const searchURL = constructWordPressPostURL({ perPage, searchTerm, categories, authors });
    console.log(authors, searchURL);

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
          <h2>{this.props.match.params.searchTerm}</h2>
          {this.state.data.map(currentArticle => <ArticleCard key={currentArticle.id} {...currentArticle} />)}
        </div>
      </div>
    );
  }
}
export default Search;
