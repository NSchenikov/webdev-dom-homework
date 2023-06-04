import { fetchGet, commentos, fetchPost } from "./api.js";
import { renderLoginComponent } from "./components/login-component.js";

export let commentsLoading = document.querySelector(".comments-loading");



let token = null;
// let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
};

function initLikeButtonsListeners() {
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

export function renderApp() {

  const appEl = document.getElementById("app");

  if(!token) {
    
    renderLoginComponent({ appEl, 
      setToken: (newToken) => {
      token = newToken;
      },
      fetchGet,
      renderApp
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

  appEl.innerHTML = appHtml;

  let addFormName = document.querySelector(".add-form-name"),
  addFormText = document.querySelector(".add-form-text"),
  addFormButton = document.querySelector(".add-form-button"),
  // comments = document.querySelector(".comments"),
  // comment = document.getElementsByTagName('li'),
  deleteFormButton = document.querySelector(".delete-form-button");
  // addForm = document.querySelector(".add-form"),
  // adding = document.querySelector(".adding"),
  // commentsLoading = document.querySelector(".comments-loading");
  
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

        token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

        fetchPost(
          addFormName.value,
          addFormText.value,
          addForm.style.display,
          adding.style.display,
          token,
          () => {
            addFormButton.classList.add('add-form-button-inactive');
          }
        );
        renderApp();
}









