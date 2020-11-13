// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyTODue3CwTHNsU7Bn2SZEGNtKay43kj8",
  authDomain: "pikadu-course.firebaseapp.com",
  databaseURL: "https://pikadu-course.firebaseio.com",
  projectId: "pikadu-course",
  storageBucket: "pikadu-course.appspot.com",
  messagingSenderId: "1030428221386",
  appId: "1:1030428221386:web:8238f4758775d49689b933"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase)
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
const editContainer = document.querySelector('.edit-container');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');

const postsWrapper = document.querySelector('.posts');
const addPostModal = document.querySelector('.add-modal');
const addPostElem = document.querySelector('.add-post');
const buttonNewPost = document.querySelector('.button-new-post');
const buttonPostModalClose = document.querySelector('.add-post-close');
const DEFAULT_AVATAR = userAvatarElem.src;



//внутри массива, объекты
// const listUsers = [
//   {
//     id: '01',
//     email: 'siyuri@mail.ru',
//     password: '12345',
//     displayName: 'Siyuri',
//     photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT4WaA0Py9h8k8t6zjYM4fRQJZmVNlUWi02zw&usqp=CAU'
//   },
//   {
//     id: '02',
//     email: 'kate@mail.ru',
//     password: '123456',
//     displayName: 'Kate',
//     photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT4WaA0Py9h8k8t6zjYM4fRQJZmVNlUWi02zw&usqp=CAU'
//   },
//   {
//     id: '03',
//     email: 'oktavia@mail.ru',
//     password: '202020',
//     displayName: 'Oktavia'
//   },
//   {
//     id: '04',
//     email: 'test@mail.ru',
//     password: '202020',
//     displayName: 'test'
//   }
// ];


const setUsers = {
  user: null, //зайденный юзер
  initUser(handler) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
      else {
        this.user = null;
      }
      if (handler) {
        handler();
      }
    })
  },
  logIn(email, password, handler) {
    if (!regValidEmail.test(email)) return alert('email not valid')
    firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
      const errCode = err.code;
      const errMessage = err.message;
      if (errCode === 'auth/wrong-password') {
        console.log(errMessage);
        alert('wwrong passwords');
      } else if (errCode === 'auth/user-not-found') {
        console.log(errMessage);
        alert('Wrong email');
      }
      else {
        alert(errMessage)
      }
      console.log(err)
    })
    // const user = this.getUser(email);
    // if (user && user.password === password) {
    //   this.authorizedUser(user);
    //   if (handler) {
    //     handler()
    //   }
    // }
    // else {
    //   alert('Пользователь с такими данными не найден')
    // }

  },
  logOut() {
    // this.user = null;

    // if (handler) {
    //   handler()
    // }
    firebase.auth().signOut();
  },
  //регистрация
  signUp(email, password, handler) {
    if (!regValidEmail.test(email)) return alert('email not valid')
    if (!email.trim() || !password.trim()) {
      alert('Введите данные')
      return;
    }
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.editUser(email, null, handler)
      })
      .catch(err => {
        const errCode = err.code;
        const errMessage = err.message;
        if (errCode === 'auth/weak-password') {
          console.log(errMessage);
          alert('weak passwords');
        } else if (errCode === 'auth/email-alrady-in-use') {
          console.log(errMessage);
          alert('This email already in use');
        }
        else {
          alert(errMessage)
        }
        console.log(err)
      })

    // if (!this.getUser(email)) {
    //   const user = { email, password, displayName: email.split('@')[0] }
    //   //email.substring(0,email.indexOf('@'))
    //   listUsers.push(user);
    //   this.authorizedUser(user);
    //   if (handler) {
    //     handler()
    //   }
    // }

    // else {
    //   alert('Пользоватль с таким е-майлом уже зарегистрирован')
    // }
  },
  editUser(displayName, photoURL, handler) {

    const user = firebase.auth().currentUser;

    if (displayName) {
      if (photoURL) {
        user.updateProfile({
          displayName,
          photoURL
        }).then(handler)
      }
      else {
        user.updateProfile({
          displayName
        }).then(handler)
      }
    }
  },
  //   if (userName) {
  //     this.user.displayName = userName;
  //   }
  //   if (userPhoto) {
  //     this.user.photo = userPhoto;
  //   }
  //   if (handler) {
  //     handler()
  //   }
  // },
  // getUser(email) {
  //   return listUsers.find(item => item.email === email)
  // },
  // authorizedUser(user) {
  //   this.user = user;
  // }
  sendForget(email) {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert('Sent')
      })
      .catch(err => {
        console.log(err)
      })
  }
};

const loginForget = document.querySelector('.login-forget');
loginForget.addEventListener('click', event => {
  event.preventDefault();
  setUsers.sendForget(emailInput.value);
  emailInput.value = '';
})


const setPosts = {
  allPosts: [
    // {
    //   title: 'Title',
    //   text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
    //   tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
    //   author: { displayName: 'maks', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT4WaA0Py9h8k8t6zjYM4fRQJZmVNlUWi02zw&usqp=CAU' },
    //   date: '11.11.2020, 20:25:45',
    //   likes: 15,
    //   comments: 20
    // },
    // {
    //   title: 'Title-2',
    //   text: 'Классный пост',
    //   tags: ['свежее', 'новое', 'мое', 'случайность'],
    //   author: { displayName: 'kate', photo: '' },
    //   date: '10.10.2020, 20:25:45',
    //   likes: 15,
    //   comments: 20
    // }
  ],
  addPost(title, text, tags, handler) {
    this.allPosts.unshift({
      id: `postID${(+new Date()).toString(16)}`,
      title,
      text,
      tags: tags.split(',').map(tag => tag.trim()), //deleting spaces
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photoURL
      },
      date: new Date().toLocaleString(),
      likes: 0,
      comments: 0,
    })

    firebase.database().ref('post').set(this.allPosts)
      .then(() => this.getPosts(handler))


  },
  getPosts(handler) {
    firebase.database().ref('post').on('value', snapshot => {
      this.allPosts = snapshot.val() || [];
      handler();
    })
  }
}



const toggleAuthDom = () => {
  const user = setUsers.user;
  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    buttonNewPost.classList.add('visible');
    // userAvatarElem.src = user.photo || userAvatarElem.src;
    userAvatarElem.src = user.photoURL ? user.photoURL : DEFAULT_AVATAR;
  }
  else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible')
  }
};


function checkValidEmail(email) {
  if (!regValidEmail.test(email)) return alert('email not valid')
}

const showAllPosts = () => {
  let postsHTML = '';
  setPosts.allPosts.forEach(({ title, text, date, tags, likes, comments, author }) => {
    postsHTML += ` 
    <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${text}</p>
          <div class="tags">
            ${tags.map(tag => `<a href="#${tag}" class="tag">#${tag}</a>`).join('')} 
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
              <a href="#" class="author-username">${author.displayName}</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src=${author.photo || "img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
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
    setUsers.logOut();
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

  buttonNewPost.addEventListener('click', event => {
    event.preventDefault();
    addPostModal.classList.add('visible');
  })
  buttonPostModalClose.addEventListener('click', event => {
    event.preventDefault();
    addPostModal.classList.remove('visible');
  })
  //na formu delaem submit
  addPostElem.addEventListener('submit', event => {
    event.preventDefault();
    // const formElements = [...addPostElem.addPostElem.elements].filter(elem => elem.tagName !== 'button'); сделать массив 
    const { title, text, tags } = addPostElem.elements;
    if (title.value.length < 6) {
      alert('Title is too small');
      return
    }
    if (text.value.length < 50) {
      alert('Post is too small');
      return
    }
    setPosts.addPost(title.value, text.value, tags.value, showAllPosts)
    addPostModal.classList.remove('visible');
    addPostModal.reset();

  })

  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
  })

  setUsers.initUser(toggleAuthDom);
  setPosts.getPosts(showAllPosts)

}
//ждем загрузки страницы, после все делаем
document.addEventListener('DOMContentLoaded', () => {
  init();
})
