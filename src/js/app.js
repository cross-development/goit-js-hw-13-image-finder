'use strict';

// const debounce = require('lodash.debounce');

import createImageCards from '../templates/img-card-temp.hbs';
import apiService from './apiService';
import * as basicLightbox from 'basiclightbox';
// import PNotify from '@pnotify/dist/PNotify.js';

const refs = {
  gallery: document.querySelector('#gallery'),
  form: document.querySelector('#search-form'),
  button: document.querySelector('#load-btn'),
  // input: document.querySelector('input[name="query"]'),
};

refs.form.addEventListener('submit', searchFromInputHandler);
refs.button.addEventListener('click', loadMoreButtonHandler);
refs.gallery.addEventListener('click', showModalWindowHandler);

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

  //! Исправить реализацию скролла с прокрутки в конец экрана на прокрутку на 1 экран (100vh)
  window.scrollTo({
    top: refs.gallery.clientHeight,
    left: 0,
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
