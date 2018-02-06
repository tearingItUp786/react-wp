// @flow

import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  id: string,
  title: { rendered: string },
  excerpt: { rendered: string },
  featured_media: string
};

const ArticleCard = (props: Props) => (
  <div className="row">
    <Link to={`/article/${props.id}`}>
      <div className="col-sm-12">
        <h1 dangerouslySetInnerHTML={{ __html: props.title.rendered }} />
        <h2 dangerouslySetInnerHTML={{ __html: props.excerpt.rendered }} />
        <h3 dangerouslySetInnerHTML={{ __html: props.featured_media }} />
      </div>
    </Link>
  </div>
);

export default ArticleCard;
