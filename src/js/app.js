'use strict';

// const debounce = require('lodash.debounce');

import createImageCards from '../templates/img-card-temp.hbs';
import apiService from './apiService';
// import * as basicLightbox from 'basiclightbox';
// import PNotify from '@pnotify/dist/PNotify.js';

const refs = {
  gallery: document.querySelector('#gallery'),
  form: document.querySelector('#search-form'),
  button: document.querySelector('#load-btn'),
  modalWindow: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.lightbox__image'),
  // input: document.querySelector('input[name="query"]'),
};

refs.form.addEventListener('submit', searchFromInputHandler);
refs.button.addEventListener('click', loadMoreButtonHandler);
// refs.gallery.addEventListener('click', showModalWindowHandler);
// refs.modalWindow.addEventListener('click', closeModalWindow);

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

// function showModalWindowHandler(e) {
//   if (e.target.id !== 'js-icon-fullscreen') {
//     return;
//   }

//   // console.dir(e.target);
//   // console.log(e.currentTarget);
//   // const url = e.target.dataset.source;
//   // const alt = e.target.getAttribute('alt');
//   refs.modalWindow.classList.add('is-open');
//   // lightboxImage.setAttribute('src', `${url}`);
//   // lightboxImage.setAttribute('alt', `${alt}`);
// }

// function closeModalWindow(e) {
//   if (
//     e.target.tagName !== 'BUTTON' &&
//     e.target.parentNode !== e.currentTarget
//   ) {
//     return;
//   }

//   refs.modalWindow.classList.remove('is-open');
//   refs.lightboxImage.removeAttribute('src');
//   refs.lightboxImage.removeAttribute('alt');
// }
