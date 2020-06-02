'use strict';

const debounce = require('lodash.debounce');

import createImageCards from '../templates/img-card-temp.hbs';
import apiService from './apiService';

const refs = {
  gallery: document.querySelector('#gallery'),
  form: document.querySelector('#search-form'),
  button: document.querySelector('#load-btn'),
  // input: document.querySelector('input[name="query"]'),
};

refs.form.addEventListener('submit', searchFromInputHandler);
refs.button.addEventListener('click', loadMoreButtonHandler);

function searchFromInputHandler(e) {
  e.preventDefault();

  const inputValue = e.currentTarget.elements.query.value;

  clearListItems();

  apiService.resetPage();
  apiService.searchQuery = inputValue;
  apiService.fetchImages().then(insertListItems);
}

function loadMoreButtonHandler() {
  apiService.fetchImages().then(insertListItems);
}

function insertListItems(items) {
  const markup = createImageCards(items);

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}
