const host = 'https://webdev-hw-api.vercel.app/api/v2/todos';

export function getTodos({token}) {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token, 
        }
      })
        .then((response) => {
    
            if(response.status === 401) { //если пароль не верный то просим пользователя ввести его снова
                // password = prompt('введите верный пароль');
                // fetchTodosAndRender();
                throw new Error('Нет авторизации');
            }
    
          return response.json();
        });
}

export function deleteTodo({token, id}) {
 // Подписываемся на успешное завершение запроса с помощью then
    return fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
     method: "DELETE",
     headers: {
        Authorization: token,
     },
    })
    .then((response) => {
         return response.json();
    });
}

export function addTodo({text, token}) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
          text,
        }),
        headers: {
            Authorization: token,
        }
      })
        .then((response) => {
          return response.json();
        });
}

export function registerUser({login, password, name}) {
  return fetch("https://webdev-hw-api.vercel.app/api/user", {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
        name,
      }),
    })
      .then((response) => {
        if(response.status === 400) {
          throw new Error('Такой пользователь уже существует');
        }
        return response.json();
      });
}

export function loginUser({login, password}) {
  return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    })
      .then((response) => {
        if(response.status === 400) {
          throw new Error('Неверный логин или пароль');
        }
        return response.json();
      });
}

