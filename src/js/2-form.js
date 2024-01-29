const form = document.querySelector('.feedback-form');
const email = form.elements.email;
email.classList.add('feedback-input');
const message = form.elements.message;
message.classList.add('feedback-input');

form.addEventListener('submit', onSubmit);
form.addEventListener('input', onInput);

const LS_KEY = 'feedback-form-state';

function onSubmit(event) {
  event.preventDefault();

  const email = form.elements.email.value;
  const message = form.elements.message.value;
  const data = {
    email,
    message,
  };

  console.log(data);
  localStorage.removeItem(LS_KEY, data);
  form.reset();
}

function onInput() {
  const email = form.elements.email.value;
  const message = form.elements.message.value;
  const data = {
    email,
    message,
  };
  addToLS(LS_KEY, data);
}

function addToLS(key, value) {
  const zip = JSON.stringify(value);
  localStorage.setItem(key, zip);
}

function loadFromLS(key) {
  const zip = localStorage.getItem(key);
  try {
    return JSON.parse(zip);
  } catch {
    return zip;
  }
}

function checkout() {
  const userData = loadFromLS(LS_KEY) || {};
  form.elements.email.value = userData.email || '';
  form.elements.message.value = userData.message || '';
}

checkout();
