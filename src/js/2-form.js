const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
emailInput.classList.add('feedback-input');
const messageInput = form.elements.message;
messageInput.classList.add('feedback-input');

form.addEventListener('submit', onSubmit);
form.addEventListener('input', onInput);

const LS_KEY = 'feedback-form-state';

function onSubmit(event) {
  event.preventDefault();

  const emailValue = emailInput.value;
  const messageValue = messageInput.value;
  const data = {
    email: emailValue,
    message: messageValue,
  };

  console.log(data);
  addToLS(LS_KEY, data);
  form.reset();
}

function onInput() {
  const emailValue = emailInput.value;
  const messageValue = messageInput.value;
  const data = {
    email: emailValue,
    message: messageValue,
  };
  addToLS(LS_KEY, data);
}

function addToLS(key, value) {
  const serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue);
}

function loadFromLS(key) {
  const serializedValue = localStorage.getItem(key);
  try {
    return JSON.parse(serializedValue);
  } catch {
    return serializedValue;
  }
}

function checkout() {
  const userData = loadFromLS(LS_KEY) || {};
  if (userData.email !== undefined && userData.email !== null) {
    form.elements.email.value = userData.email;
  }
  if (userData.message !== undefined && userData.message !== null) {
    form.elements.message.value = userData.message;
  }
}

checkout();
