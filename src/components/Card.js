export default function Card(props) {
  function handleClick() {
    props.onCardClick({ name: props.name, link: props.src });
  }

  return (
    <li className="element">
      <img
        className="element__image"
        src={props.src}
        alt={props.name}
        onClick={handleClick}
      />
      <div className="element__info">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__like-container">
          <button type="button" className="element__like"></button>
          <span className="element__likes-counter">
            {props.likes > 0 ? props.likes : null}
          </span>
        </div>
        <button className="element__btn-trash"></button>
      </div>
    </li>
  );
}
