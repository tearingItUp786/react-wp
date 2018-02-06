// @flow

export type WordPressPostAPI = {
  per_page: Number,
  searchText: string,
  categories: string
}

declare var module: {
  hot: {
    accept: (path: ?string, callback: ?() => void) => void
  }
}