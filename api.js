import { commentsLoading, renderApp } from "./script.js";

export let commentos = [];

const host = 'https://wedev-api.sky.pro/api/v2/nikita-schenikov/comments';

export function fetchGet({token}) {
    commentsLoading.style.display = "block";
    fetch(host, {
        method: "GET",
        headers: {
          Authorization: token,
        }
    })
      .then((response) => {
        if(response.status === 401) {
          throw new Error("Нет авторизации");
        }
        return response.json();
      })
      .then((responseData) => {
          const appComments = responseData.comments
          .map((comment) => {
            return {
              name: comment.author.name,
              date: new Date(Date.parse(comment.date)).toLocaleDateString() + ' ' + new Date(Date.parse(comment.date)).getHours() + ':' + new Date(Date.parse(comment.date)).getMinutes(),
              text: comment.text,
              likes: comment.likes,
              isLiked: false,
              id: comment.id,
            };
          });
          return appComments;
        })
        .then((data) => {
          commentsLoading.style.display = "none";
          commentos = data;
          renderApp();
        });
  };

  export function fetchPost(name, text, form, adding, token, callback) {
    fetch(host, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          text: text,
          // forceError: true,
        }),
        headers: {
          Authorization: token,
        }
      })
      .then((response) => {
        if(response.status === 500) {

            alert('Сервер сломался, попробуй позже');
            throw new Error("Ошибка сервера");

        } else if(response.status === 400) {

            alert('Имя и комментарий должны быть не короче 3 символов');
            throw new Error("Неверный запрос");
          
        } else {
            return response.json();
        } 
      })
      .then((responseData) => {
          console.log(responseData);
          fetchGet(token);
          renderApp();
      })
      .then((data) => {
        form = 'flex';
        adding = 'none';

        name = '';
        text = '';
        callback;
      })
      .catch((error) => {

        if(!navigator.onLine) {
           alert('Кажется, у вас сломался интернет, попробуйте позже');
        }

        form = 'flex';
        adding = 'none';

        console.warn(error);
      });
  }

  // https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/v2/%5Bkey%5D/comments/README.md

  export function registerUser({login, password, name}) {
    return fetch("https://wedev-api.sky.pro/api/user", {
        method: "POST",
        body: JSON.stringify({
          login,
          password,
          name,
        }),
      }).then((response) => {
        if(response.status === 400) {
          throw new Error('Такой пользователь уже существует');
        }
        if(response.status === 500) {
          throw new Error('Ошибка регистрации');
        }
        return response.json();
      });
  }

  export function loginUser({login, password}) {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({
          login,
          password,
        }),
      }).then((response) => {
        if(response.status === 400) {
          throw new Error('Неверный логин или пароль');
        }
        if(response.status === 500) {
          throw new Error('Ошибка авторизации');
        }
        return response.json();
      });
  }


