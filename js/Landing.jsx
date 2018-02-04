// @flow

import React, { Component } from 'react';
import type { RouterHistory } from 'react-router-dom';
import axios from 'axios';
import { WP_CATEGORIES } from './config';
import Categories from './Categories';

type Props = {
  handleSearchTermChange: Function,
  searchTerm: string,
  history: RouterHistory
};

type State = {
  categories: Array<*>,
  values: Array<*>
};

class Landing extends Component<Props, State> {
  
  state = {
    categories: [],
    values: []
  }

  componentDidMount() {
    axios.get(WP_CATEGORIES).then((response: { data: Array<*> }) => {
      this.setState({ categories: response.data });
    });
  }

  goToArticleSearch = (event: SyntheticEvent<*>) => {
    event.preventDefault();
    this.props.history.push('/search');
  };

  handleCategoryChange = (event: SyntheticEvent<*>) => {
    const { options } = event.currentTarget;
    const values = [];
    for (let i = 0; i < options.length; i += 1) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    this.setState({ values });
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={this.goToArticleSearch}>
            <div className="form-group">
              <label htmlFor="searchWord">
                Search Blog
                <input
                  value={this.props.searchTerm}
                  onChange={this.props.handleSearchTermChange}
                  type="text"
                  className="form-control"
                  id="searchWord"
                  placeholder="search the blog"
                />
              </label>
            </div>
            <Categories handleCategoryChange={this.handleCategoryChange} values={this.state.values} categories={this.state.categories}/>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Landing;
