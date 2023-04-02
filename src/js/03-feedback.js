const throttle = require('lodash.throttle');
const feedFormEl = document.querySelector('.feedback-form');
const submitBtn = document.querySelector('.feedback-form button');
const STORAGE_KEY = 'feedback-form-state';
const obj = {};

feedFormEl.addEventListener('input', throttle(getValues, 500));
window.addEventListener('DOMContentLoaded', refreshForm);
submitBtn.addEventListener('click', submitFn);

function saveData(key, value) {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (error) {
    console.log('Something wrong:', error.message, error.type);
  }
}
function loadData(key) {
  try {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
  } catch (err) {
    console.error('Some error:', err.message, err.type);
  }
}

function getValues({ target }) {
  if (target.name === 'email') {
    obj.email = target.value;
  } else if (target.name === 'message') {
    obj.message = target.value;
  }
  saveData(STORAGE_KEY, obj);
}

function refreshForm() {
  const currentState = loadData(STORAGE_KEY);
  if (currentState !== undefined) {
    feedFormEl.elements['email'].value = currentState.email;
    feedFormEl.elements['message'].value = currentState.message;
  } else {
    feedFormEl.elements['email'].value = '';
    feedFormEl.elements['message'].value = '';
  }
}

function submitFn(ev) {
  ev.preventDefault();
  console.log(loadData(STORAGE_KEY));
  localStorage.removeItem(STORAGE_KEY);
  feedFormEl.reset();
}
