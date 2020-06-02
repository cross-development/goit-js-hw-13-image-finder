'use strict';
const baseUrl = 'https://pixabay.com/api/';
const keyAPI = '16822291-3bd987bc1a9b2ff27c6ed5ac6';

export default {
  page: 1,
  query: '',
  fetchImages() {
    const requestParams = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${keyAPI}`;

    return fetch(baseUrl + requestParams)
      .then(response => response.json())
      .then(parsedResponse => {
        this.incrementPage();
        return parsedResponse.hits;
      });
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(str) {
    this.query = str;
  },
};
