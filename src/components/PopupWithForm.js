export default function PopupWithForm(props) {

    return (
      <>
        <div className={`popup popup_type_${props.name} ` + (props.isOpen ? 'popup_open' : '')}>
          <div className="popup__container">
            <button type="button" class="popup__close" id="addClose"></button>
            <h2 className="popup__title">{props.title}</h2>
            <form
              className="popup__form"
              id={`form-${props.name}`}
            name={props.name}
            autoComplete="on"
            noValidate
            >
                {props.children}
              <button
                type="submit"
                className="popup__button"
              >
                {props.buttonText}
              </button>
            </form>
            <button
            className='popup__close'
            type="button"
            onClick={props.onClose}
          ></button>
          </div>
        </div>
      </>
    );
  }

