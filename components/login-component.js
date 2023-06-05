import { loginUser } from "../api.js";

export function renderLoginComponent({appEl, setToken, fetchGet, renderApp}) {
    const appHtml = `
    <div class="container">
    <div class="add-form">
      <h3>Форма входа</h3>
      <input
        type="text"
        id="login-input"
        placeholder="Логин"
      />
      <br />
      <input
        type="password"
        id="password-input"
        placeholder="Пароль"
      ></input>
      <div class="">
        <button id="login-button">Войти</button>
      </div>
    </div>
  </div>`;

    appEl.innerHTML = appHtml;

    document.getElementById('login-button').addEventListener('click', () => {

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
        setToken(`Bearer ${user.user.token}`);
        fetchGet(`Bearer ${user.user.token}`);
        renderApp();
      }).catch(error => {
        //поработать над алертом
        alert(error.message);
      });
    });
}