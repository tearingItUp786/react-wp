import { constructWordPressPostURL, WP_POSTS } from '../config';

const defaultSearchURL = `${WP_POSTS}?`;
const perPage = 5;
const currentPage = 1;

describe('Testing constructoWordPressPostURL function', () => {
  test('Wordpress search url returns url with current page of 1 and per page of 5 if no arguments provided', () => {
    const searchURL = `${defaultSearchURL}page=${currentPage}&per_page=${perPage}`;
    const result = constructWordPressPostURL();
    expect(result).toBe(searchURL);
  });

  test('Wordpress search url defaults current page to be 1 if number less than 1 provided', () => {
    const passedInCurrentPage = 0;
    const searchURL = `${defaultSearchURL}page=${currentPage}&per_page=${perPage}`;
    const result = constructWordPressPostURL({ currentPage: passedInCurrentPage, perPage });
    expect(result).toBe(searchURL);
  });

  test('Wordpress search url has correct current page if param passed in is greater than 0', () => {
    const passedInCurrentPage = 1;
    const searchURL = `${defaultSearchURL}page=${currentPage}&per_page=${perPage}`;
    const result = constructWordPressPostURL({ currentPage: passedInCurrentPage, perPage });
    expect(result).toBe(searchURL);
  });

  test('Wordpress search url sets search term if search term is present', () => {
    const searchTerm = 'dog and cats';
    const searchURL = `${defaultSearchURL}page=${currentPage}&per_page=${perPage}&search=${searchTerm}`;
    const result = constructWordPressPostURL({ searchTerm });
    expect(result).toBe(searchURL);
  });

  test('Wordpress search url sets categories if categories provided', () => {
    const categories = '1,2,3';
    const searchURL = `${defaultSearchURL}page=${currentPage}&per_page=${perPage}&categories=${categories}`;
    const result = constructWordPressPostURL({ categories });
    expect(result).toBe(searchURL);
  });

  test('WordPress search url sets author if authors provided', () => {
    const authors = '1,2,3';
    const searchURL = `${defaultSearchURL}page=${currentPage}&per_page=${perPage}&author=${authors}`;
    const result = constructWordPressPostURL({ authors });
    expect(result).toBe(searchURL);
  });

  test('Wordpress search url sets per page to be per page provided', () => {
    const passedInPerPage = 10;
    const searchURL = `${defaultSearchURL}page=${currentPage}&per_page=${passedInPerPage}`;
    const result = constructWordPressPostURL({ perPage: passedInPerPage });
    expect(result).toBe(searchURL);
  });

  test('Wordpress search url ignores per page parameter if invalid value (less than or equal to zero)', () => {
    const passedInPerPage = 0;
    const searchURL = `${defaultSearchURL}page=${currentPage}`;
    const result = constructWordPressPostURL({ perPage: passedInPerPage });
    expect(result).toBe(searchURL);
  });
});
