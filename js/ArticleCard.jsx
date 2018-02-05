// @flow 

import React from 'react';

type Props = {
  title: { rendered: string },
  excerpt: {rendered: string},
  featured_media: string
}

const ArticleCard = (props: Props) => (
  <div className="row">
    <div className="col-sm-12">
      <h1 dangerouslySetInnerHTML={{__html:props.title.rendered}} />
      <h2 dangerouslySetInnerHTML={{__html:props.excerpt.rendered}} />
      <h3 dangerouslySetInnerHTML={{__html:props.featured_media}} />
    </div>
  </div>
);

export default ArticleCard;
