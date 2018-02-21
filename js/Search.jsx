// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import type { Match, Location, RouterHistory } from 'react-router-dom';
import axios from 'axios';
import { constructWordPressPostURL } from './config';
import ArticleCard from './ArticleCard';

type Props = {
  location: Location,
  match: Match,
  history: RouterHistory
};

type State = {
  data: Array<*>,
  searchTerm: string,
  categories: string,
  author: string,
  currentPage: number,
  totalPages: number,
  perPage: number
};

const Pagination = props => {
  const pageLinkElementsArray = [];

  // eslint-disable-next-line
  const { searchTerm, categories, authors, totalPages, currentPage } = props;
  let linkTo = `/search?searchTerm=${searchTerm}`;

  if (categories !== undefined) {
    linkTo = `${linkTo}&categories=${categories}`;
  }

  if (authors !== undefined) {
    linkTo = `${linkTo}&author=${authors}`;
  }

  for (let i = 1; i <= totalPages; i += 1) {
    let listItemClass = 'page-item';
    if (i === currentPage) {
      listItemClass = `${listItemClass} active`;
    }
    pageLinkElementsArray.push(
      <li key={i} className={listItemClass}>
        <Link className="page-link" to={`${linkTo}&page=${i}`}>
          {i}
        </Link>
      </li>
    );
  }

  return (
    <nav aria-label="pagination">
      <ul className="pagination">{pageLinkElementsArray}</ul>
    </nav>
  );
};

class Search extends Component<Props, State> {
  state = {
    data: [],
    searchTerm: '',
    categories: '',
    authors: '',
    currentPage: 1,
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
        // console.log(response.headers);
      })
      .catch(error => console.log(error));
  }

  createSearchURL = () => {
    const params = new URLSearchParams(this.props.location.search);
    let searchTerm;
    let categories;
    let authors;
    let { currentPage } = this.state;
    const { perPage } = this.state;

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
    }

    // $FlowFixMe
    this.setState({
      searchTerm,
      currentPage,
      categories,
      authors
    });

    const searchURL = constructWordPressPostURL({ currentPage, perPage, searchTerm, categories, authors });
    console.log(authors, searchURL);
    return searchURL;
  };

  render() {
    const { searchTerm, categories, authors, totalPages, currentPage } = this.state;
    return (
      <div className="row">
        <div className="col-sm-12">
          <Pagination
            searchTerm={searchTerm}
            categories={categories}
            authors={authors}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
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
