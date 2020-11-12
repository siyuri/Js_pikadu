// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 


const regValidEmail = /^.+@.+\..+$/;
///^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');
const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container')

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const editUsername = document.querySelector('.edit-username')
const editPhotoURL = document.querySelector('.edit-photo')
const userAvatarElem = document.querySelector('.user-avatar')

const postsWrapper = document.querySelector('.posts')
const addPostModal = document.querySelector('.add-modal')


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
    if (!regValidEmail.test(email)) return alert('email not valid')

    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    }
    else {
      alert('Пользователь с такими данными не найден')
    }
  },
  logOut(handler) {
    this.user = null;
    handler();
  },
  //регистрация
  signUp(email, password, handler) {
    if (!regValidEmail.test(email)) return alert('email not valid')
    if (!email.trim() || !password.trim()) {
      alert('Введите данные')
      return;
    }

    if (!this.getUser(email)) {
      const user = { email, password, displayName: email.split('@')[0] }
      //email.substring(0,email.indexOf('@'))
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    }

    else {
      alert('Пользоватль с таким е-майлом уже зарегистрирован')
    }
  },
  editUser(userName, userPhoto = "", handler) {
    if (userName) {
      this.user.displayName = userName;
    }
    if (userPhoto) {
      this.user.photo = userPhoto;
    }
    handler();
  },
  getUser(email) {
    return listUsers.find(item => item.email === email)
  },
  authorizedUser(user) {
    this.user = user;
  }
}

const setPosts = {
  allPosts: [
    {
      title: 'Title',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: 'siyuri097@mediaList.ru',
      date: '11.11.2020, 20:25:45',
      likes: 15,
      comments: 20
    },
    {
      title: 'Title-2',
      text: 'Классный пост',
      tags: ['свежее', 'новое', 'мое', 'случайность'],
      author: 'test@mail.ru',
      date: '10.10.2020, 20:25:45',
      likes: 15,
      comments: 20
    }
  ]
}



const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log('user:', user)
  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    // userAvatarElem.src = user.photo || userAvatarElem.src;
    userAvatarElem.src = user.photo ? user.photo : userAvatarElem.src;
  }
  else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};

function checkValidEmail(email) {
  if (!regValidEmail.test(email)) return alert('email not valid')
}

const showAllPosts = () => {
  let postsHTML = '';
  setPosts.allPosts.forEach(({ title, text, date, tags, likes, comments }) => {
    postsHTML += ` 
    <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${text}</p>
          <div class="tags">
            ${tags.map(tag => '<a href="#" class="tag">' + ' #' + tag + '</a>').join('') //вернуть тот же аррэй, но с # и убрать запятые
      }
          </div>
          <!-- /.tags -->
        </div>
        <!-- /.post-body -->
        <div class="post-footer">
          <div class="post-buttons">
            <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">${likes}</span>
            </button>
            <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">${comments}</span>
            </button>
            <button class="post-button save">
              <svg width="19" height="19" class="icon icon-save">
                <use xlink:href="img/icons.svg#save"></use>
              </svg>
            </button>
            <button class="post-button share">
              <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="img/icons.svg#share"></use>
              </svg>
            </button>
          </div>
          <!-- /.post-buttons -->
          <div class="post-author">
            <div class="author-about">
              <a href="#" class="author-username">arteislamov</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
          </div>
          <!-- /.post-author -->
        </div>
        <!-- /.post-footer -->
      </section>
    `;
  })
  postsWrapper.innerHTML = postsHTML;
}
//функция инициализации
const init = () => {

  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  })

  loginSignup.addEventListener('click', event => {
    event.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  })

  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  })

  editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  })

  editContainer.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
    editContainer.classList.remove('visible')
  })

  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
  })
  showAllPosts();
  toggleAuthDom();
}
//ждем загрузки страницы, после все делаем
document.addEventListener('DOMContentLoaded', () => {
  init();
})
