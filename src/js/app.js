'use strict';

const debounce = require('lodash.debounce');

import createImageCards from '../templates/img-card-temp.hbs';
import apiService from './apiService';
import * as basicLightbox from 'basiclightbox';
import { error, Stack } from '@pnotify/core';

const refs = {
  gallery: document.querySelector('#gallery'),
  form: document.querySelector('#search-form'),
  button: document.querySelector('#load-btn'),
};

refs.form.addEventListener('input', debounce(searchFromInputHandler, 700));
refs.button.addEventListener('click', loadMoreButtonHandler);
refs.gallery.addEventListener('click', showModalWindowHandler);

function searchFromInputHandler(e) {
  e.preventDefault();

  const inputValue = e.target.value;

  clearListItems();

  apiService.resetPage();
  apiService.searchQuery = inputValue;
  fetchImagesByApiService();
}

function loadMoreButtonHandler() {
  fetchImagesByApiService();
}

function fetchImagesByApiService() {
  apiService
    .fetchImages()
    .then(insertListItems)
    .catch(e => {
      const myStack = new Stack({
        dir1: 'down',
        dir2: 'left',
        firstpos1: 60,
        firstpos2: -25,
        context: document.querySelector('.header'),
      });

      return error({
        text: `Images not found. Try again! ${e.message}`,
        stack: myStack,
      });
    });
}

function insertListItems(items) {
  const markup = createImageCards(items);

  refs.gallery.insertAdjacentHTML('beforeend', markup);

  window.scrollTo({
    top: refs.form.clientHeight + refs.gallery.clientHeight,
    behavior: 'smooth',
  });
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}

function showModalWindowHandler(e) {
  if (e.target.id !== 'js-icon-fullscreen') {
    return;
  }

  const img = e.target.parentElement.previousElementSibling;

  const instance = basicLightbox.create(`
      <img src="${img.getAttribute('src')}">
  `);

  instance.show();
}
