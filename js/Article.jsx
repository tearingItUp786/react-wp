// @flow

import React, { Component } from 'react';
import type { Match } from 'react-router-dom';
import { getSinglePost } from './config';

type State = {
  article: any
};

type Props = {
  match: Match
};

class Article extends Component<Props, State> {
  state = {
    article: {
      title: {
        rendered: 'Default Title'
      },
      content: {
        rendered: '<p>Default content</p>'
      }
    }
  };

  componentDidMount() {
    const { match } = this.props;
    getSinglePost(match.params.id)
      .then(response => {
        const article = response.data[0];
        this.setState({ article });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { article } = this.state;
    return (
      <div className="row">
        <div className="col-sm-12">
          <h1>{article.title.rendered}</h1>
        </div>
        <div className="col-sm-12" dangerouslySetInnerHTML={{ __html: article.content.rendered }} />
      </div>
    );
  }
}
export default Article;
