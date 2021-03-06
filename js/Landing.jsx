// @flow

import React from 'react';
import type { RouterHistory } from 'react-router-dom';
import Categories from './Categories';
import Authors from './Authors';

type Props = {
  handleSearchTermChange: Function,
  handleSelectChange: Function,
  categoryValues: Array<*>,
  categories: Array<*>,
  authors: Array<*>,
  authorValues: Array<*>,
  searchTerm: string,
  history: RouterHistory,
  pageNumber: number
};

const Landing = (props: Props) => {
  const goToArticleSearch = (event: SyntheticEvent<*>) => {
    event.preventDefault();

    let historyPushValue = `/search?searchTerm=${props.searchTerm}`;
    let stringOfCategories = props.categoryValues.map(currentCategory => currentCategory.toString());
    let stringOfAuthors = props.authorValues.map(currentAuthor => currentAuthor.toString());
    stringOfAuthors = stringOfAuthors.toString();
    stringOfCategories = stringOfCategories.toString();

    if (stringOfCategories !== '') {
      historyPushValue = `${historyPushValue}&categories=${stringOfCategories}`;
    }

    if (stringOfAuthors !== '') {
      historyPushValue = `${historyPushValue}&author=${stringOfAuthors}`;
    }

    historyPushValue = `${historyPushValue}&page=${props.pageNumber}`;

    props.history.push(`${historyPushValue}`);
  };

  return (
    <div className="row">
      <div className="col-sm-12">
        <form onSubmit={goToArticleSearch}>
          <div className="form-group">
            <label htmlFor="searchWord">
              Search Blog
              <input
                value={props.searchTerm}
                onChange={props.handleSearchTermChange}
                type="text"
                className="form-control"
                id="searchWord"
                placeholder="search the blog"
              />
            </label>
          </div>
          <Categories
            handleSelectChange={props.handleSelectChange}
            values={props.categoryValues}
            categories={props.categories}
          />
          <Authors handleSelectChange={props.handleSelectChange} values={props.authorValues} authors={props.authors} />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Landing;
