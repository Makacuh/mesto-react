import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopap";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [currentPath, setCurrentPath] = useState("/");
  const navigate = useNavigate();
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(false);

  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const openInfoTooltip = () => {
    setInfoTooltipOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .toggleLike(card._id, isLiked ? "DELETE" : "PUT")
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteClick(card) {
    api
      .deleteElement(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => card._id !== c._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handlePathChange = (newPath) => {
    setCurrentPath(newPath);
  };

  useEffect(() => {
    auth
      .tokenCheck(localStorage.getItem("token"))
      .then((result) => {
        if (result) {
          setUserEmail(result.data.email);
          setLoggedIn(true);
          navigate("/");
          setCurrentPath("/");
        } else {
          throw new Error(
            "Ошибка текущего сеанса. Необходимо заново авторизироваться"
          );
        }
      })
      .catch((err) => {
        console.log(`Ошибка входа по токену ${err}`);
        navigate("/sign-in");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserEmail("");
    setLoggedIn(false);
    navigate("/sign-in");
    setCurrentPath("/sign-in");
  };

  const handleSignupSubmit = (data) => {
    return auth
      .register(data)
      .then((data) => {
        setIsRegistrationSuccessful(true);
        openInfoTooltip();
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccessful(false);
        openInfoTooltip();
      });
  };

  const handleSigninSubmit = (email, password) => {
    auth
      .authorization(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setUserEmail(email);
          setLoggedIn(true);
          navigate("/");
          setCurrentPath("/");
        } else {
          throw new Error("Не удалось получить токен от сервера");
        }
      })
      .catch((err) => {
        console.log(
          alert(`Ошибка авторизации ${err}. Проверьте корректность данных`)
        );
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      
      <Header
        userEmail={userEmail}
        onLogout={handleLogout}
        path={currentPath}
      />

      <Routes>
        <Route
          path="/sign-in"
          element={
            <Login
              onSignin={handleSigninSubmit}
              onPathChange={handlePathChange}
            />
          }
        />
        
        <Route
          path="/sign-up"
          element={<Register onRegister={handleSignupSubmit} />}
        />

        <Route
        path="/"
          element={
            <ProtectedRoute
              
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
          
            />
          }
        />
      </Routes>

      <Footer />

      <InfoTooltip
        onClose={closeAllPopups}
        isOpen={isInfoTooltipOpen}
        isSuccess={isRegistrationSuccessful}
      />

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonText="Да"
        onClose={closeAllPopups}
      ></PopupWithForm>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        closeAllPopups={closeAllPopups}
        onSubmit={handleAddPlaceSubmit}
      ></AddPlacePopup>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}
