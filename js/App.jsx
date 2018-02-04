// @flow

import React, { Component } from 'react';
import axios from 'axios';
import Main from './Main';
import { WP_REST_URL } from './config';

class App extends Component<{}, { siteTitle: string }> {
  state = {
    siteTitle: 'Navbar'
  };

  componentDidMount() {
    axios.get(WP_REST_URL).then((response: { data: { name: string } }) => {
      this.setState({ siteTitle: response.data.name });
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
          <a className="navbar-brand" href="/">
            {this.state.siteTitle}
          </a>
        </nav>
        <Main />
      </div>
    );
  }
}

export default App;
