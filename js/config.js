import axios from 'axios';

export const WP_REST_URL = 'http://vagrant.local/wp-json/';
export const WP_POSTS = `${WP_REST_URL}wp/v2/posts`;
export const WP_CATEGORIES = `${WP_REST_URL}wp/v2/categories`;
export const WP_SETTINGS = `${WP_REST_URL}wp/v2/settings`;
export const WP_USERS = `${WP_REST_URL}wp/v2/users`;

export function constructWordPressPostURL({ perPage, searchTerm, categories, authors }) {
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

  if (authors !== undefined) {
    searchURL = `${searchURL}&author=${authors}`;
  }

  return searchURL;
}

export function getCategories() {
  return axios.get(`${WP_CATEGORIES}/`);
}

export function getUsers() {
  return axios.get(`${WP_USERS}/`);
}

export function getSinglePost(postID) {
  return axios.get(`${WP_POSTS}?include=${postID}`);
}
