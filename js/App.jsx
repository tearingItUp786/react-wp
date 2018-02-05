// @flow

import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import axios from 'axios';
import Main from './Main';
import { WP_REST_URL } from './config';

class App extends Component<{}, { siteTitle: string }> {
  state = {
    siteTitle: 'Navbar'
  };

  componentDidMount() {
    axios
      .get(WP_REST_URL)
      .then((response: { data: { name: string } }) => {
        this.setState({ siteTitle: response.data.name });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
            <Link className="navbar-brand" to="/">
              {this.state.siteTitle}
            </Link>
          </nav>
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
