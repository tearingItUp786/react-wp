// @flow

import React, { Component } from 'react';
import type { Match } from 'react-router-dom';
import { getSinglePost, getRelatedPostsBasedOnCategory } from './config';
import ArticleCard from './ArticleCard';

type State = {
  article: any,
  relatedPosts: any
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
      },
      categories: []
    },
    relatedPosts: []
  };

  componentDidMount() {
    const { match } = this.props;

    getSinglePost(match.params.id)
      .then(response => {
        const retrievedArticle = response.data[0];
        this.setState({ article: retrievedArticle });
      })
      .then(() => getRelatedPostsBasedOnCategory(this.state.article.categories))
      .then(response => {
        this.setState({ relatedPosts: response.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { article } = this.state;
    const { relatedPosts } = this.state;
    return (
      <div className="row">
        <div className="col-sm-12">
          <h1>{article.title.rendered}</h1>
        </div>
        <div className="col-sm-12" dangerouslySetInnerHTML={{ __html: article.content.rendered }} />
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12">
              <h1>Related Articles</h1>
              {relatedPosts.map(currentValue => (
                <div key={currentValue.id} className="col-sm-3">
                  <ArticleCard
                    id={currentValue.id}
                    title={currentValue.title}
                    featured_media={currentValue.featured_media}
                    excerpt={null}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Article;
