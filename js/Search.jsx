// @flow

import React from 'react';
import type  {Match } from 'react-router-dom';


const Search = (props: { searchTerm: string, match: Match }) => (
  <div>
    <h1>{(
      props.match.params.category
    )}</h1>
    <h1>Search</h1>
    <h2>{props.searchTerm}</h2>
  </div>
);
export default Search;
