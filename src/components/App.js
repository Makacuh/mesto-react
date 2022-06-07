import "../App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  return (
    <html lang="ru">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Место</title>
      </head>

      <body className="page">
        <Header />

        <Main />

        <Footer />

        

        <div className="popup popup_confirm">
          <div className="popup__container">
            <button type="button" class="popup__close"></button>
            <h3 className="popup__title">Вы уверены?</h3>
            <form name="popup-confirm" className="popup__form form" novalidate>
              <button type="submit" className="popup__button">
                Да
              </button>
            </form>
          </div>
        </div>

        <div className="popup popup_type_avatar">
          <div className="popup__container">
            <button type="button" class="popup__close"></button>
            <h3 classname="popup__title">Обновить аватар</h3>
            <form
              name="edit-avatar-form"
              className="popup__form edit-avatar-form form"
              id="popup-form-avatar"
              novalidate
            >
              <input
                type="url"
                name="link"
                id="avatar-url"
                placeholder="Ссылка на картинку"
                className="popup__input"
                required
              />
              <span classname="popup__error-message avatar-url-error"></span>
              <button
                type="submit"
                classname="popup__button"
                aria-label="Обновить"
              >
                Сохранить
              </button>
            </form>
          </div>
        </div>

        <div className="popup profile-popup">
          <div className="popup__container">
            <h2 className="popup__name">Редактировать профиль</h2>
            <form
              class="popup__form popup__edit-element"
              name="edit-form"
              id="popup__edit-element"
              novalidate
            >
              <input
                type="text"
                className="popup__input"
                name="name"
                id="input-popup-title"
                placeholder="Имя"
                minlength="2"
                maxlength="40"
                autocomplete="off"
                required
              />
              <span className="popup__error-message input-popup-title-error"></span>
              <input
                type="text"
                className="popup__input"
                name="info"
                id="input-popup-subtitle"
                placeholder="Вид деятельности"
                minlength="2"
                maxlength="200"
                autocomplete="off"
                required
              />
              <span className="popup__error-message input-popup-subtitle-error"></span>
              <button
                type="submit"
                class="popup__button"
                aria-label="Сохранить"
              >
                Сохранить
              </button>
            </form>
            <button
              type="button"
              className="popup__close"
              aria-label="Закрыть"
              id="editClose"
            ></button>
          </div>
        </div>

        <div className="popup popup_type_place">
          <div className="popup__container">
            <button type="button" class="popup__close" id="addClose"></button>
            <h3 className="popup__title">Новое место</h3>
            <form
              className="popup__form popup__form-add-element"
              name="place-form"
              id="popup__form-add-element"
              novalidate
            >
              <input
                className="popup__input popup__input_name"
                type="text"
                id="card-name"
                name="name"
                placeholder="Название"
                minlength="2"
                maxlength="30"
                required
              />
              <span className="popup__error-message card-name-error"></span>
              <input
                class="popup__input popup__input_link"
                type="url"
                id="card-link"
                name="link"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="popup__error-message card-link-error"></span>
              <button
                type="submit"
                className="popup__button"
                aria-label="Добавить место"
              >
                Создать
              </button>
            </form>
          </div>
        </div>

        <div className="popup popup_window">
          <div className="popup__preview">
            <figure className="popup__figure">
              <img className="popup__image" src="#" alt="" />
              <figcaption class="popup__figcaption"></figcaption>
            </figure>
            <button
              type="button"
              class="popup__close"
              id="owerviewClose"
            ></button>
          </div>
        </div>

        <template className="element-template">
          <li class="element">
            <img className="element__image" src="#" alt="" />
            <div className="element__info">
              <h2 className="element__title"></h2>
              <div className="element__like-container">
                <button type="button" class="element__like"></button>
                <span className="element__likes-counter">0</span>
              </div>
              <button
                className="element__btn-trash"
                type="button"
                title="Удалить"
              ></button>
            </div>
          </li>
        </template>
      </body>
    </html>
  );
}

export default App;
