// @flow

import React from 'react';
import type { RouterHistory } from 'react-router-dom';

const Landing = (props: { handleSearchTermChange: Function, searchTerm: string, history: RouterHistory }) => {
  const goToArticleSearch = event => {
    event.preventDefault();
    props.history.push('/search');
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
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};
export default Landing;
