// @flow

import React, { Component } from 'react';
import axios from 'axios';
import Main from './Main';
import { WP_REST_URL, WP_CATEGORIES } from './config';

class App extends Component<{}, {siteTitle: string, categories: Array}> {
  state = {
    siteTitle: 'Navbar',
    categories: [],
  };
  componentDidMount() {
    axios.get(WP_REST_URL).then( ( response: { data: { name: string }} ) => {
      this.setState({ siteTitle: response.data.name });
    });

    axios.get(WP_CATEGORIES).then ( (response: { data: Array<*> }) => {
      this.setState({categories: response.data});
    })
  }
  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
          <a className="navbar-brand" href="/">
            {this.state.siteTitle}
          </a>
        </nav>
        <Main categories={this.state.categories}/>
      </div>
    );
  }
}

export default App;
