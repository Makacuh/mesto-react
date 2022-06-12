import {useState} from 'react';
import "../App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopap";
import PopupWithForm from "./PopupWithForm";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  return (
    <>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonText="Да"
        isOpen={false}
        onClose={closeAllPopups}
      ></PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input"
          id="avatar-url"
          name="popupInputLinkAvatar"
          type="url"
          required
          placeholder="Ссылка на аватар"
        />
        <span className="popup__error-message avatar-url-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input"
          id="popup__edit-element"
          name="popupInputName"
          type="text"
          required
          maxLength="40"
          minLength="2"
          placeholder="Введите ваше имя"
        />
        <span className="popup__error-message input-popup-title-error"></span>

        <input
          className="popup__input"
          id="input-popup-subtitle"
          name="popupInputInfo"
          type="text"
          required
          maxLength="200"
          minLength="2"
          placeholder="Расскажите о себе"
        />
        <span className="popup__error-message input-popup-subtitle-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="card"
        title="Новое место"
        buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_name"
          id="card-name"
          name="popupInputCard"
          type="text"
          required
          maxLength="30"
          minLength="2"
          placeholder="Название"
        />
        <span className="popup__error-message card-name-error"></span>
        <input
          className="popup__input popup__input_link"
          id="card-link"
          name="popupInputUrl"
          type="url"
          required
          placeholder="Ссылка на картинку"
        />
        <span className="popup__error-message card-link-error"></span>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}
