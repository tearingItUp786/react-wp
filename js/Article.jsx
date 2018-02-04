// @flow

import React from 'react';

const Article = (props: Location) => (
  <div>
    <pre>
      <code>{JSON.stringify(props, null, 4)}</code>
    </pre>
  </div>
);
export default Article;
