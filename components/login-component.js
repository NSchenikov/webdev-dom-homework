

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
      setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
      fetchGet("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
      renderApp();
    });
}