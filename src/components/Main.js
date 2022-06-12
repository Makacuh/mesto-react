import { useEffect, useState } from "react";
import api from "../utils/api.js";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userProfile, setUserProfile] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
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

    api
      .getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserProfile(data.about);
        setUserAvatar(data.avatar);
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
          style={{ backgroundImage: `url(${userAvatar})` }}
        >
          <button
            type="button"
            onClick={props.onEditAvatar}
            className="profile__avatar-button"
          ></button>
        </div>

        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">{userName}</h1>
            <button
              type="button"
              onClick={props.onEditProfile}
              className="profile__edit-button"
              aria-label="Редактировать"
            ></button>
          </div>
          <p className="profile__subtitle">{userProfile}</p>
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
          {cards.map((card) => (
            <Card
              src={card.src}
              name={card.name}
              key={card.keyId}
              likes={card.likes}
              onCardClick={props.onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
