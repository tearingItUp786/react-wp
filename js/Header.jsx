// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router';
import { WP_REST_URL } from './config';

type State = {
  siteTitle: string,
  backToSearchLink: string
};

type Props = {
  location: Location,
  categoryValues: Array<*>,
  authorValues: Array<*>,
  searchTerm: string,
  pageNumber: number,
  createLinkForSearch: Function
};

class Header extends Component<Props, State> {
  state = {
    siteTitle: 'Default Title',
    backToSearchLink: '/search'
  };

  componentDidMount() {
    axios
      .get(WP_REST_URL)
      .then((response: { data: { name: string } }) => {
        this.setState({ siteTitle: response.data.name });
      })
      .catch(error => console.log(error));
  }

  // not allowed to set state inside of componentDidMount when receiving props from parent -- best place is below
  componentWillReceiveProps() {
    const { pageNumber, searchTerm, categoryValues, authorValues } = this.props;
    const backToSearchLink = this.props.createLinkForSearch(pageNumber, searchTerm, categoryValues, authorValues);

    this.setState({ backToSearchLink });
  }

  render() {
    const { location } = this.props;
    let utilSpace = '';

    if (location.pathname.indexOf('article') !== -1) {
      utilSpace = (
        <div className="collapse navbar-collapse" id="navbarText">
          <Link className="navbar-text" to={this.state.backToSearchLink}>
            Back to Search
          </Link>
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
