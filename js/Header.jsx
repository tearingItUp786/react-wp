// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router';
import { WP_REST_URL } from './config';

type State = {
  siteTitle: string
};

type Props = {
  location: Location,
  history: {
    goBack: Function
  }
};

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
    const { location } = this.props;
    let utilSpace = '';

    if (location.pathname.indexOf('article') !== -1) {
      utilSpace = (
        <div className="collapse navbar-collapse" id="navbarText">
          <button onClick={() => this.props.history.goBack()} className="navbar-text">
            Back
          </button>
        </div>
      );
    }

    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
        <Link className="navbar-brand" to="/">
          {this.state.siteTitle}
        </Link>
        {utilSpace}
      </nav>
    );
  }
}

export default withRouter(Header);
