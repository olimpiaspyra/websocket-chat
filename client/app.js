const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content));

 const login = (event) => {
     event.preventDefault();
     if (userNameInput.value === '') {
         alert ('Please enter your login');
    }
        else {
            userName = userNameInput.value;
            loginForm.classList.remove('show');
            messagesSection.classList.add('show');            
        }
};

loginForm.addEventListener('submit', login);

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');

  if (author === userName) message.classList.add('message--self');
    message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
};

const sendMessage = (event) => {
  event.preventDefault();

  let messageContent = messageContentInput.value;

    if (!messageContent.length) {
    alert('You have to type something!');
    } else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContentInput.value})
    messageContentInput.value = '';
  }
}

addMessageForm.addEventListener('submit', sendMessage);
