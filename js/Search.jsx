// @flow

import React, { Component } from 'react';
import type { Match, Location, RouterHistory } from 'react-router-dom';
import axios from 'axios';
import { constructWordPressPostURL } from './config';
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';

type Props = {
  location: Location,
  match: Match,
  history: RouterHistory,
  pageNumber: number,
  updatePageNumber: Function
};

type State = {
  data: Array<*>,
  searchTerm: string,
  categories: string,
  authors: string,
  totalPages: number,
  perPage: number
};

class Search extends Component<Props, State> {
  state = {
    data: [],
    searchTerm: '',
    categories: '',
    authors: '',
    totalPages: 1,
    perPage: 5
  };

  componentDidMount() {
    axios
      .get(this.createSearchURL())
      .then(response => {
        this.setState({ data: response.data });

        if (response.headers !== undefined) {
          this.setState({ totalPages: response.headers['x-wp-totalpages'] });
        }
      })
      .then(() => Promise.resolve(this.getURLParams()))
      .then(response => {
        // console.log(response);
        const { searchTerm, categories, authors } = response;
        this.setState({
          searchTerm,
          categories,
          authors
        });
      })
      .catch(error => console.log(error));
  }

  getURLParams = () => {
    const params = new URLSearchParams(this.props.location.search);
    let searchTerm = '';
    let categories = '';
    let authors = '';
    const { pageNumber } = this.props;
    const { perPage } = this.state;
    let currentPage = pageNumber;

    if (params.get('searchTerm') !== null) {
      searchTerm = params.get('searchTerm');
    }

    if (params.get('categories') !== null) {
      categories = params.get('categories');
    }

    if (params.get('author') !== null) {
      authors = params.get('author');
    }

    if (params.get('page') !== null) {
      currentPage = Number(params.get('page'));
      if (currentPage !== pageNumber) {
        this.props.updatePageNumber(currentPage);
      }
    }

    return { currentPage, perPage, searchTerm, categories, authors };
  };

  createSearchURL = () => {
    const searchURL = constructWordPressPostURL(this.getURLParams());
    return searchURL;
  };

  render() {
    const { pageNumber } = this.props;
    const { category } = this.props.match.params;
    const { searchTerm, categories, authors, totalPages, data } = this.state;
    return (
      <div className="row">
        <div className="col-sm-12">
          <Pagination
            searchTerm={searchTerm}
            categories={categories}
            authors={authors}
            totalPages={totalPages}
            currentPage={pageNumber}
          />
        </div>
        <div className="col-sm-12">
          <h1>{category}</h1>
          <h1>Search</h1>
          <h2>{searchTerm}</h2>
          {data.map(currentArticle => <ArticleCard key={currentArticle.id} {...currentArticle} />)}
        </div>
      </div>
    );
  }
}
export default Search;
