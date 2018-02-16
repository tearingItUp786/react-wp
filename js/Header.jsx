// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { WP_REST_URL } from './config';

type State = {
  siteTitle: string
};

type Props = {};

class Header extends Component<Props, State> {
  state = {
    siteTitle: 'Default Title'
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
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
        <Link className="navbar-brand" to="/">
          {this.state.siteTitle}
        </Link>
      </nav>
    );
  }
}

export default Header;
