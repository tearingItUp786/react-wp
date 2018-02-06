// @flow

import React from 'react';
import type { RouterHistory } from 'react-router-dom';

import Categories from './Categories';

type Props = {
  handleSearchTermChange: Function,
  handleCategoryChange: Function,
  categoryValues: Array<*>,
  categories: Array<*>,
  searchTerm: string,
  history: RouterHistory
};

const Landing = (props: Props) => {
  const goToArticleSearch = (event: SyntheticEvent<*>) => {
    event.preventDefault();

    let stringOfCategories = props.categoryValues.map(currentCategory => currentCategory.toString());
    stringOfCategories = stringOfCategories.toString();

    let historyPushValue = `/search/${props.searchTerm}`;

    if (stringOfCategories !== '') {
      historyPushValue = `${historyPushValue}/${stringOfCategories}`;
    }

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
            handleCategoryChange={props.handleCategoryChange}
            values={props.categoryValues}
            categories={props.categories}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Landing;
