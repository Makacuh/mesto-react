import React from "react";


function Main (props){



    return(
<main>
          <section className="profile">
            <button type="button" onClick={props.onEditAvatar} class="profile__avatar-button">
              <img
                className="profile__avatar"
                src="#"
                alt="Аватар пользователя"
              />
            </button>
            <div className="profile__info">
              <div className="profile__name">
                <h1 className="profile__title">Жак-иф-Кусто</h1>
                <button
                  type="button"
                  onClick={props.onEditProfile}
                  className="profile__edit-button"
                  aria-label="Редактировать"
                ></button>
              </div>
              <p className="profile__subtitle">Исследователь окенан</p>
            </div>
            <button
              type="button"
              onClick={props.onAddPlace}
              className="profile__add-button"
              aria-label="Добавить"
            ></button>
          </section>

          <section>
            <ul className="elements"></ul>
          </section>
        </main>);

}

export default Main