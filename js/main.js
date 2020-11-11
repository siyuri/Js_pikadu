// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');


//внутри массива, объекты
const listUsers = [
  {
    id: '01',
    email: 'siyuri097@mediaList.ru',
    password: '123456',
    displayName: 'Siyuri'
  },
  {
    id: '02',
    email: 'kate@mail.ru',
    password: '123456',
    displayName: 'Kate'
  },
  {
    id: '03',
    email: 'oktavia@mail.ru',
    password: '202020',
    displayName: 'Oktavia'
  },
  {
    id: '04',
    email: 'test@mail.ru',
    password: '202020',
    displayName: 'test'
  }
];


const setUsers = {
  user: null, //зайденный юзер
  logIn(email, password, handler) {
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    }
    else {
      alert('Пользователь с такими данными не найден')
    }
  },
  logOut() {
    console.log('logout');
  },
  //регистрация
  signUp(email, password, handler) {
    if (!this.getUser(email)) {
      const user = { email, password, displayName: email.split('@')[0] }
      listUsers.push(user);
      this.authorizedUser(user);
      handler();

    }
    else {
      alert('Пользоватль с таким е-майлом уже зарегистрирован')
    }
  },
  getUser(email) {
    return listUsers.find(item => item.email === email)
  },
  authorizedUser(user) {
    this.user = user;
  }
}

const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log('user:', user)
  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
  }
  else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};



loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
})

loginSignup.addEventListener('click', event => {
  event.preventDefault();
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
})

toggleAuthDom();