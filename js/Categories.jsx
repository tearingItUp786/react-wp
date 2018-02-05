// @flow

import React from 'react';

type Props = {
  categories: Array<*>,
  values: Array<*>,
  handleCategoryChange: Function
};

const Categories = (props: Props) => (
  <div className="form-group">
    <label htmlFor="exampleSelect1">
      Categories select
      <select
        multiple
        onChange={props.handleCategoryChange}
        value={props.values}
        className="form-control"
        id="exampleSelect1"
      >
        {/* Had to use dangerous set inner html because of a wordpress issue */}
        {props.categories.map(currentCategory => (
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

export default Categories;