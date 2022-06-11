export default function Card(props) {
  function handleClick() {
    props.onCardClick({name: props.name, link: props.src});
  }

  return (
    <li class="element" >
        <img class="element__image" src={props.src} alt={props.name} onClick={handleClick}/>
        <div class="element__info">
          <h2 class="element__title">{props.name}</h2>
          <div class="element__like-container">
            <button type="button" class="element__like"></button>
            <span class="element__likes-counter">{props.likes > 0 ? props.likes : null}</span>
          </div>
          <button
            className="element__btn-trash"
            type="button"
            title="Удалить"
          ></button>
        </div>
      </li>
  );
}


      
  