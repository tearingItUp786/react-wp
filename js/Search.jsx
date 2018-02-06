// @flow

import React, { Component } from 'react';
import type { Match } from 'react-router-dom';
import axios from 'axios';
import { constructWordPressPostURL } from './config';
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

    let searchTerm;
    let categories;
    const perPage = 3;

    if (match.params.searchTerm !== undefined && match.params.searchTerm !== null) {
      searchTerm = match.params.searchTerm.toString();
    }

    if (match.params.categories !== undefined && match.params.categories !== null) {
      categories = match.params.categories.toString();
    }

    const searchURL = constructWordPressPostURL({ perPage, searchTerm, categories });
    console.log(searchURL);

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
