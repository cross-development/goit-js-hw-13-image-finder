'use strict';

import createImageCards from '../templates/img-card-temp.hbs';
import fetchImages from './apiService';

const refs = {
  gallery: document.querySelector('#gallery'),
  form: document.querySelector('#search-form'),
  button: document.querySelector('#load-btn'),
};
