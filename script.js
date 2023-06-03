// let addFormName = document.querySelector(".add-form-name"),
// addFormText = document.querySelector(".add-form-text"),
// addFormButton = document.querySelector(".add-form-button"),
// comments = document.querySelector(".comments"),
// comment = document.getElementsByTagName('li'),
// deleteFormButton = document.querySelector(".delete-form-button"),
// addForm = document.querySelector(".add-form"),
// adding = document.querySelector(".adding"),
// commentsLoading = document.querySelector(".comments-loading");
let commentsLoading = document.querySelector(".comments-loading");


let commentos = [];


const host = 'https://wedev-api.sky.pro/api/v2/nikita-schenikov/comments';

//  const token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

 let token = null;


fetchGet = () => {
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



function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
};





initLikeButtonsListeners = () => {
  let likeButtonsElements = document.querySelectorAll('.like-button');

  

  for(const likeButtonElement of likeButtonsElements) {

    likeButtonElement.addEventListener('click', (event) => {

      event.stopPropagation();

      const index = likeButtonElement.dataset.index;
      console.log(index);
      likeButtonElement.classList.add('-loading-like');
      delay(2000)
      .then(() => {
        if(commentos[index].isLiked) {
          commentos[index].likes -= 1;
          commentos[index].isLiked = !commentos[index].isLiked;
        } else {
          commentos[index].likes += 1;
          commentos[index].isLiked = !commentos[index].isLiked;
        }
      })
      .then(() => {
        likeButtonElement.classList.remove('-loading-like');
        renderApp();
      });
    });
  }
  
};

fetchGet();


renderApp = () => {

  const appEl = document.getElementById("app");

  if(!token) {
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
      token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
      fetchGet();
      renderApp();
    });

    return;
  }

  

  const commentsHtml = commentos.map((comment, index) => {

    return `<li class="comment" data-id='${comment.id}'>
    <div class="comment-header">
      <div>${comment.name}</div>
      <div>${comment.date}
      </div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${comment.text}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter" data-id='${comment.id}'>${commentos[index].likes}</span>
        <button 
        class="like-button ${comment.isLiked ? '-active-like' : ''}" 
        data-index='${index}'>
        </button>
      </div>
    </div>
    <button class='correct-form-button' data-id='${comment.id}'>Редактировать</button>
  </li>`;
}).join('');

  const appHtml = `
        <div class="container">

        <div class="comments-loading">
          Пожалуйста подождите, загружаю комментарии...
        </div>
        <ul class="comments">
          <!-- add by js --->
          ${commentsHtml}
        </ul>
        <div class="add-form">
          <input
            type="text"
            class="add-form-name"
            placeholder="Введите ваше имя"
          />
          <textarea
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш коментарий"
            rows="4"
          ></textarea>
          <div class="add-form-row">
            <button class="delete-form-button">Удалить последний комментарий</button>
            <button class="add-form-button">Написать</button>
          </div>
        </div>
        <div class="adding">
          Комментарий добавляется...
        </div>
      </div>`;



  // let comments = document.querySelector(".comments");

  appEl.innerHTML = appHtml;

  let addFormName = document.querySelector(".add-form-name"),
  addFormText = document.querySelector(".add-form-text"),
  addFormButton = document.querySelector(".add-form-button"),
  comments = document.querySelector(".comments"),
  comment = document.getElementsByTagName('li'),
  deleteFormButton = document.querySelector(".delete-form-button"),
  addForm = document.querySelector(".add-form"),
  adding = document.querySelector(".adding"),
  commentsLoading = document.querySelector(".comments-loading");
  
  addFormButton.classList.add('add-form-button-inactive');

  initLikeButtonsListeners();

    addFormName.addEventListener('input', () => {
      if(addFormName.value !== 0 && addFormText.value !== 0) {
          addFormButton.classList.remove('add-form-button-inactive');
      }
  });

  addFormText.addEventListener('input', () => {
      if(addFormName.value !== 0 && addFormText.value !== 0) {
          addFormButton.classList.remove('add-form-button-inactive');
      }
  });

  addFormButton.addEventListener('click', () => {

    clickable();

  });

  deleteFormButton.addEventListener('click', () => {
    commentos.pop();
    renderApp();
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        clickable();
    }
  });
};

renderApp();







function clickable() {

  let addFormName = document.querySelector(".add-form-name"),
  addFormText = document.querySelector(".add-form-text"),
  addFormButton = document.querySelector(".add-form-button"),
  addForm = document.querySelector(".add-form"),
  adding = document.querySelector(".adding");

        addFormName.classList.remove('error');
    addFormText.classList.remove('error');

    if(addFormName.value === '') {
        addFormName.classList.add('error');
        addFormButton.classList.add('add-form-button-inactive');
        return;
    }
    if(addFormText.value === '') {
        addFormText.classList.add('error');
        addFormButton.classList.add('add-form-button-inactive');
        return;
    }

    addForm.style.display = 'none';
    adding.style.display = 'block';
    

        fetch(host, {
          method: "POST",
          body: JSON.stringify({
            name: addFormName.value,
            text: addFormText.value,
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
            fetchGet();
            renderApp();
        })
        .then((data) => {
          addForm.style.display = 'flex';
          adding.style.display = 'none';

          addFormName.value = '';
          addFormText.value = '';
          addFormButton.classList.add('add-form-button-inactive');
        })
        .catch((error) => {

          if(!navigator.onLine) {
             alert('Кажется, у вас сломался интернет, попробуйте позже');
          }

          addForm.style.display = 'flex';
          adding.style.display = 'none';

          console.warn(error);
        });



}









