export default function ImagePopup() {
    return(
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
    )
  }