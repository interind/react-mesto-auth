import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';
import * as auth from '../utils/auth.js';
import api from '../utils/api.js';
import Main from './Main.js';
import Login from './Login';
import Header from './Header.js';
import Footer from './Footer.js';
import Loader from './Loader/Loader.js';
import Register from './Register';
import InfoTooltip from './InfoTooltip.js';
import AddPlacePopup from './AddPlacePopup.js';
import ErrorBoundary from './Error/ErrorBoundary.js';
import ProtectedRoute from './ProtectedRoute';
import EditAvatarPopup from './EditAvatarPopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import { ErrorPage } from './Error/ErrorPage';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import Navbar from './Navbar.js';

function App({history}) {
  // const history = useHistory();
  const [isCard, setIsCard] = React.useState({});
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isConfirmTrashPopupOpen, setConfirmTrashPopup] = React.useState(false);
  const [isNavbarOpen, setNavbarOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    _id: '',
    avatar: '',
  }); // тут информация обо мне с сервера
  const [cards, setCards] = React.useState([]); // тут информация о карточках
  const [loading, setLoading] = React.useState(true); // лоадер при загрузке страницы
  const [statusOk, setIsOk] = React.useState(true); // флаг для ошибки сервера
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [statusError, setError] = React.useState({}); // флаг для ошибки сервера
  const [isOpenCard, setOpenCard] = React.useState(false); // тут булевое значение для попапа с картинкой
  const [isOpenCheck, setOpenCheck] = React.useState(true); // окно информации регистрации
  const [isTooltip, setTooltip] = React.useState({ isOpenMessage: false, status: false, message: '' });
  const [selectedCard, setSelectedCard] = React.useState({}); // объект для попапа с картинкой
  const [buttonLoading, setButtonLoading] = React.useState(false); // Лоадер для кнопки сохранить.
  // const [token, setToken] = React.useState({})
  const [userAuth, setUserAuth] = React.useState({
    link: '',
    title: '',
    email: '',
  }); // данные в шапке при регистрации

  function onLogin(token) {
    setTooltip({ ...isTooltip, isOpenMessage: true, status: true });
    localStorage.setItem('token', token);
  }

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        // проверим токен
        auth.getContent(token).then((res) => {
          console.log('app' ,res)
          try {
            if (res) {
              setUserAuth({
                link: '/sign-in',
                title: 'Выйти',
                email: res.data.email,
              });
              setLoggedIn(true);
              history.push('/');
            }
          } catch (e) {
            return new Error(e);
          }
        });
      }
    }
  }, [history, loggedIn]);

  function visibleNavbar() {
    setNavbarOpen(true);
  }

  function hiddenNavbar() {
    setNavbarOpen(false);
  }

  function handleLogin(event){
    event.preventDefault();
    setLoggedIn(true);
  }

  function handleLogOut(event) {
    event.preventDefault();
    setLoggedIn(false);
  }

  function closeAllPopupsEsc(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }


  React.useEffect(() => {
    window.addEventListener('keydown', closeAllPopupsEsc);

    return () => {
      window.removeEventListener('keydown', closeAllPopupsEsc);
    };
  });

  React.useEffect(() => {
    // получаем данные с сервера
    Promise.all([api.getInfoForUser(), api.getInfoForCards()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser);
        setCards(dataCards);
        setIsOk(true);
      })
      .catch((err) => {
        console.error('Информация сервера с ошибкой', err.message);
        setError(err);
        setIsOk(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  function handleUpdateUser(props) {
    // получаем новую информацию пользователя  с сервера
    setButtonLoading(true);

    api
      .updateUserInfo({ name: props.name, about: props.about })
      .then((infoUser) => {
        setCurrentUser({
          ...currentUser,
          name: infoUser.name,
          about: infoUser.about,
        });
      })
      .catch((err) =>
        console.error('Информация обновления пользователя с ошибкой', err)
      )
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(props) {
    setButtonLoading(true);
    // получаем обновленный аватар с сервера
    api
      .updateUserAvatar({ avatar: props.avatar })
      .then((infoAvatar) => {
        setCurrentUser({ ...currentUser, avatar: infoAvatar.avatar });
      })
      .catch((err) =>
        console.error('Информация обновления пользователя с ошибкой', err)
      )
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleAddPlace(props) {
    setButtonLoading(true);
    // получаем новую карточку с сервера и вставляем в начало
    api
      .addCard({ name: props.name, link: props.link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) =>
        console.error('Информация обновления карточки с ошибкой', err)
      )
      .finally(() => {
        closeAllPopups();
      });
  }

  function closeAllPopups() {
    // закрытие всех попапов
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setConfirmTrashPopup(false);
    setOpenCard(false);
    setButtonLoading(false);
    setOpenCheck(true);
    setTooltip({
      ...isTooltip,
      isOpenMessage: false,
      message: '',
    });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopup(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopup(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopup(true);
  }
  function handleConfirmTrashClick(card) {
    setConfirmTrashPopup(true);
    setIsCard(card);
  }
  function handleCardClick(props) {
    // для открытия попапа с картинкой
    setSelectedCard({ link: props.link, name: props.name });
    setOpenCard(true);
  }

  function handleCardLike({ likes, _id }) {
    // получаем лайки с сервера
    const isLiked = likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(_id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === _id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) =>
        console.error('Информация по карточкам с ошибкой', err.message)
      );
  }

  function handleCardDelete({ _id }) {
    // удаляем карточку
    const idCard = _id;

    setButtonLoading(true);

    api
      .deleteCard(_id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== idCard));
      })
      .catch((err) =>
        console.error('Информация по карточкам с ошибкой', err.message)
      )
      .finally(() => {
        closeAllPopups();
      });
  }

  return (
    <React.Fragment>
      <div className='page'>
        <CurrentUserContext.Provider value={currentUser}>
          <ErrorBoundary>
            <Switch>
              <Route path='/sign-in' exact>
                <Login
                  isOpen={isOpenCheck}
                  isLoadingButton={buttonLoading}
                  handleLogin={handleLogin}
                  onClose={closeAllPopups}
                  onNavbar={visibleNavbar}
                  offNavbar={hiddenNavbar}
                  onLogin={onLogin}
                />
              </Route>
              <Route path='/sign-up' exact>
                <Register
                  isOpen={isOpenCheck}
                  isLoadingButton={buttonLoading}
                  onClose={closeAllPopups}
                  onNavbar={visibleNavbar}
                  offNavbar={hiddenNavbar}
                />
              </Route>
              <ProtectedRoute exact path='/' loggedIn={loggedIn}>
                {loading && <Loader />}
                {statusOk & !loading && (
                  <React.Fragment>
                    {loggedIn && (
                      <InfoTooltip
                        isOpen={isTooltip}
                        onClose={closeAllPopups}
                      />
                    )}
                    {isNavbarOpen && (
                      <Navbar selectorPlace={'page'} linkInfo={userAuth} />
                    )}
                    <Header
                      linkInfo={userAuth}
                      handleLogOut={handleLogOut}
                      onNavbar={visibleNavbar}
                      offNavbar={hiddenNavbar}
                    />
                    <Main
                      cards={cards}
                      isOpenCard={isOpenCard}
                      selectedCard={selectedCard}
                      closeAllPopups={closeAllPopups}
                      handleCardLike={handleCardLike}
                      onAddPlace={handleAddPlaceClick}
                      handleCardClick={handleCardClick}
                      onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick}
                      handleCardDelete={handleConfirmTrashClick}
                    />
                    <AddPlacePopup
                      isOpen={isAddPlacePopupOpen}
                      isLoadingButton={buttonLoading}
                      onClose={closeAllPopups}
                      onAddPlace={handleAddPlace}
                    />
                    <EditAvatarPopup
                      isOpen={isEditAvatarPopupOpen}
                      isLoadingButton={buttonLoading}
                      onClose={closeAllPopups}
                      onUpdateAvatar={handleUpdateAvatar}
                    />
                    <EditProfilePopup
                      isOpen={isEditProfilePopupOpen}
                      isLoadingButton={buttonLoading}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                    />
                    <DeleteCardPopup
                      isCard={isCard}
                      isLoadingButton={buttonLoading}
                      isOpen={isConfirmTrashPopupOpen}
                      onClose={closeAllPopups}
                      onDeleteCard={handleCardDelete}
                    />
                    <Footer />
                  </React.Fragment>
                )}
                {!statusOk & !loading && (
                  <React.Fragment>
                    <Header
                      linkInfo={userAuth}
                      handleLogOut={handleLogOut}
                      onNavbar={visibleNavbar}
                      offNavbar={hiddenNavbar}
                    />
                    <ErrorPage error={statusError} />
                    <Footer />
                  </React.Fragment>
                )}
              </ProtectedRoute>
              <Route>
                {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
              </Route>
            </Switch>
          </ErrorBoundary>
        </CurrentUserContext.Provider>
      </div>
    </React.Fragment>
  );
}

export default withRouter(App);
