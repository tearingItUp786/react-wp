import { constructWordPressPostURL, WP_POSTS } from '../config';

test('Wordpress search url returns url with current page of 1 and per page of 5 if no arguments provided', () => {
  const searchURL = `${WP_POSTS}?page=1&per_page=5`;
  const result = constructWordPressPostURL();
  expect(result).toBe(searchURL);
});
