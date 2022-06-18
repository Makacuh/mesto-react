import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext} from "react";

export default function Card ({card}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
	const cardDeleteButtonClassName = (
		`card__delete-icon ${isOwn ? '' : 'card__delete-icon_hidden'}`
	);

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
	const cardLikeButtonClassName = (
		`card__like ${isLiked ? 'card__like_active' : ''}`
	);

  function handleClick() {
    card.onCardClick({ name: card.name, link: card.src });
  }

  return (
    <li className="element">
      <img
        className="element__image"
        src={card.src}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button type="button" className="element__like"></button>
          <span className="element__likes-counter">
            {card.likes > 0 ? card.likes : null}
          </span>
        </div>
        <button className="element__btn-trash"></button>
      </div>
    </li>
  );
}
