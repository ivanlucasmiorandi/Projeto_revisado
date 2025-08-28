// ===== Alternar abas =====
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
});

registerTab.addEventListener('click', () => {
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
  registerForm.classList.add('active');
  loginForm.classList.remove('active');
});

// ===== LOGIN =====
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const users = JSON.parse(localStorage.getItem('users')) || {};

  if(users[username] && users[username] === password) {
    loginMessage.style.color = 'green';
    loginMessage.textContent = "Login bem-sucedido!";
  } else {
    loginMessage.style.color = 'red';
    loginMessage.textContent = "Usuário ou senha incorretos.";
  }
});

// ===== REGISTRO =====
const registerMessage = document.getElementById('registerMessage');

registerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const newUsername = document.getElementById('newUsername').value;
  const newPassword = document.getElementById('newPassword').value;
  let users = JSON.parse(localStorage.getItem('users')) || {};

  if(users[newUsername]) {
    registerMessage.style.color = 'red';
    registerMessage.textContent = "Usuário já existe!";
  } else {
    users[newUsername] = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    registerMessage.style.color = 'green';
    registerMessage.textContent = "Registro bem-sucedido! Agora faça login.";
    registerForm.reset();
  }
});
