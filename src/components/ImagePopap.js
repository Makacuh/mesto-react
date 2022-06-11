export default function ImagePopup(props) {
  return (
    <div className={`popup ${props.card.link && "popup_open"}`}>
      <div className="popup__preview">
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={props.card.link}
            alt={props.card.name}
          />
          <figcaption className="popup__figcaption">
            {props.card.name}
          </figcaption>
        </figure>
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
