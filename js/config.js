import { WordPressPostAPI } from '../flow-typed/types';

// @flow

export const WP_REST_URL = 'http://demo.wp-api.org/wp-json/';
export const WP_POSTS = `${WP_REST_URL}wp/v2/posts`;
export const WP_CATEGORIES = `${WP_REST_URL}wp/v2/categories`;
export const WP_SETTINGS = `${WP_REST_URL}wp/v2/settings`;

export function constructWordPressPostURL({ perPage, searchTerm, categories }: WordPressPostAPI) {
  let searchURL = `${WP_POSTS}?`;

  if (perPage !== 0) {
    searchURL = `${searchURL}per_page=${perPage}`;
  }

  if (searchTerm !== undefined) {
    searchURL = `${searchURL}&search=${searchTerm}`;
  }

  if (categories !== undefined) {
    searchURL = `${searchURL}&categories=${categories}`;
  }

  return searchURL;
}
