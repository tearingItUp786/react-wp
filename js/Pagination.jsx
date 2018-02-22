import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  searchTerm: string,
  categories: string,
  authors: string,
  totalPages: number,
  currentPage: number
};

const Pagination = (props: Props) => {
  const pageLinkElementsArray = [];

  const { searchTerm, categories, authors, totalPages, currentPage } = props;
  let linkTo = `/search?searchTerm=${searchTerm}`;

  if (categories !== undefined) {
    linkTo = `${linkTo}&categories=${categories}`;
  }

  if (authors !== undefined) {
    linkTo = `${linkTo}&author=${authors}`;
  }

  for (let i = 1; i <= totalPages; i += 1) {
    let listItemClass = 'page-item';
    if (i === currentPage) {
      listItemClass = `${listItemClass} active`;
    }
    pageLinkElementsArray.push(
      <li key={i} className={listItemClass}>
        <Link className="page-link" to={`${linkTo}&page=${i}`}>
          {i}
        </Link>
      </li>
    );
  }

  return (
    <nav aria-label="pagination">
      <ul className="pagination">{pageLinkElementsArray}</ul>
    </nav>
  );
};

export default Pagination;
