// @flow

import React from 'react';

type Props = {
  authors: Array<any>,
  values: Array<*>,
  handleSelectChange: Function
};

const Authors = (props: Props) => (
  <div className="form-group">
    <label htmlFor="exampleSelect2">
      Authors select
      <select
        multiple
        onChange={(event: SyntheticEvent<*>) => props.handleSelectChange(event, 'authors')}
        value={props.values}
        className="form-control"
        id="exampleSelect2"
      >
        {/* Had to use dangerous set inner html because of a wordpress issue */}
        {props.authors.map(currentCategory => (
          <option
            key={currentCategory.id}
            value={currentCategory.id}
            dangerouslySetInnerHTML={{ __html: currentCategory.name }}
          />
        ))}
      </select>
    </label>
  </div>
);

export default Authors;
