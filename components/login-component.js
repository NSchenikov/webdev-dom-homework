import { loginUser, registerUser } from "../api.js";

export let currentUser = {};

export function renderLoginComponent({appEl, setToken, fetchGet, renderApp}) {

    let isLoginMode = true;

    const renderForm = () => {
      const appHtml = `
      <div class="container">
      <div class="add-form">
        <h3>Форма ${isLoginMode ? 'входа' : 'регистрации'}</h3>
  
        ${isLoginMode ? '' : `     
          <input
            type="text"
            id="name-input"
            placeholder="Введите имя"
          />
          <br />`
        }
  
        <input
          type="text"
          id="login-input"
          placeholder="Введите логин"
        />
        <br />
        <input
          type="password"
          id="password-input"
          placeholder="Введите пароль"
        ></input>
        <div class="">
          <button id="login-button">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
        </div>
        <br /><br />
        <div class="register">${isLoginMode ? 'Зарегистрироваться' : 'Войти'}</div>
      </div>
    </div>`;
  
      appEl.innerHTML = appHtml;
  
      document.getElementById('login-button').addEventListener('click', () => {

        if(isLoginMode) {
          const login = document.getElementById('login-input').value;
          const password = document.getElementById('password-input').value;
    
          if(!login) {
            alert('Введите логин');
            return;
          }
    
          if(!password) {
            alert('Введите пароль');
            return;
          }
    
          loginUser({
            login: login,
            password: password
          })
          .then((user) => {
            currentUser = user.user;
            setToken(`Bearer ${user.user.token}`);
            fetchGet(`Bearer ${user.user.token}`);
            renderApp();
          }).catch(error => {
            //поработать над алертом
            alert(error.message);
          });
        } else {
          const login = document.getElementById('login-input').value;
          const name = document.getElementById('name-input').value;
          const password = document.getElementById('password-input').value;

          if(!name) {
            alert('Введите имя');
            return;
          }
    
          if(!login) {
            alert('Введите логин');
            return;
          }
    
          if(!password) {
            alert('Введите пароль');
            return;
          }
    
          registerUser({
            login: login,
            password: password,
            name: name,
          })
          .then((user) => {
            setToken(`Bearer ${user.user.token}`);
            fetchGet(`Bearer ${user.user.token}`);
            renderApp();
          }).catch(error => {
            //поработать над алертом
            alert(error.message);
          });
        }
      });
  
      document.querySelector(".register").addEventListener("click", () => {
        isLoginMode = !isLoginMode;
        renderForm();
      });
    };

    renderForm();
}