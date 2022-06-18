import { useContext, useEffect, useState } from "react";
import api from "../utils/api.js";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import currentUser from "./App";

function Main(props) {
  const { name, about, avatar } = useContext(CurrentUserContext);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
} 

  const [cards, setCards] = useState([]);
  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(
          data.map((item) => ({
            src: item.link,
            name: item.name,
            likes: item.likes.length,
            keyId: item._id,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main>
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${avatar})` }}
        >
          <button
            type="button"
            onClick={props.onEditAvatar}
            className="profile__avatar-button"
          ></button>
        </div>

        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">{name}</h1>
            <button
              type="button"
              onClick={props.onEditProfile}
              className="profile__edit-button"
              aria-label="Редактировать"
            ></button>
          </div>
          <p className="profile__subtitle">{about}</p>
        </div>
        <button
          type="button"
          onClick={props.onAddPlace}
          className="profile__add-button"
          aria-label="Добавить"
        ></button>
      </section>

      <section>
        <ul className="elements">
          {cards.map((data) => (
            <Card
              card={data}
              key={data.keyId}
              onCardClick={props.onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
