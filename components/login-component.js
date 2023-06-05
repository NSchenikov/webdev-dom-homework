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
        type="text"
        id="login-input"
        placeholder="Пароль"
      ></input>
      <div class="">
        <button id="login-button">Войти</button>
      </div>
    </div>
  </div>`;

    appEl.innerHTML = appHtml;

    document.getElementById('login-button').addEventListener('click', () => {

      loginUser({
        login: "admin",
        password: "admin"
      })
      .then((user) => {
        setToken(`Bearer ${user.user.token}`);
        fetchGet(`Bearer ${user.user.token}`);
        renderApp();
      });
    });
}