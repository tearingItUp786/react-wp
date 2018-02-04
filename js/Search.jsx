// @flow

import React from 'react';

const Search = (props: { searchTerm: string }) => (
  <div>
    <h1>Search</h1>
    <h2>{props.searchTerm}</h2>
  </div>
);
export default Search;
