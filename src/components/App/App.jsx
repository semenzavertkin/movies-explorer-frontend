import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProptectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
import InfoTooltip from "../InfoTooltip/InfoTooltip";



const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const hideForHeader = ['/signin', '/signup', '/not-found'];
  const hideForFooter = ['/signin', '/signup', '/profile', '/not-found'];
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [err, setErr] = useState(false);



  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.checkToken(jwt)
        .then((res) => {
          setCurrentUser(res)
          setLoggedIn(true);
        })
        .catch(err => console.log(err));
    } else {
      setLoggedIn(false)
    }
  }, [navigate])

  useEffect(() => {
    if (loggedIn && (location.pathname === '/signin' || location.pathname === '/signup')) {
      navigate('/movies');
    }
  }, [loggedIn, location.pathname, navigate]);

  function handleRegister(name, email, password,) {
    mainApi
      .register(name, email, password,)
      .then((res) => {
        setIsInfoTooltipPopupOpen(true);
        setErr(false);
        handleLogin(email, password);
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setErr(true);
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    mainApi
      .login(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          navigate('/movies');
          return mainApi.getUserInfo();
        }
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setErr(true);
        console.log(err);
      });
  };

  function handleLogout() {
    setLoggedIn(false);
    localStorage.clear();
    navigate('/');
  }

  function handleEditProfile(name, email) {
    mainApi
      .setUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
        setIsInfoTooltipPopupOpen(true);
        setErr(false);
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setErr(true);
        console.log(err);
      });
  }

  function handleSaveMovie(movie) {
    const isSaved = savedMovies.some((item) => item.movieId === movie.id);
    if (!isSaved) {
      mainApi.saveMovie(movie)
        .then((savedMovie) => {
          setSavedMovies([...savedMovies, savedMovie]);
        })
        .catch((err) => {
          console.error('Ошибка при сохранении фильма: ', err);
        });
    } else {
      const deleteMovies = savedMovies.find(
        (item) => item.movieId === movie.id
      );

      if (deleteMovies && deleteMovies._id) {
        mainApi.deleteMyMovie(deleteMovies._id)
          .then(() => {
            setSavedMovies((movies) =>
              movies.filter((item) => item._id !== deleteMovies._id)
            );
          })
          .catch((err) => {
            console.error('Ошибка при удалении фильма:', err);
          });
      }
    }
  };

  const handleDeleteMovie = (movie) => {
    return mainApi.deleteMyMovie(movie._id)
      .then(() => {
        setSavedMovies((savedMovies) =>
          savedMovies.filter((item) => item._id !== movie._id)
        )
      })
      .catch((err) => {
        console.error('Ошибка при удалении фильма: ', err);
      });
  }
  function closeAllPopups() {
    setIsInfoTooltipPopupOpen(false);
  }



  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        {!hideForHeader.includes(location.pathname) && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path='/' element={
            <Main loggedIn={loggedIn}
            />}
          />

          <Route
            path='/movies'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Movies}
                savedMovies={savedMovies}
                onSave={handleSaveMovie}
              />
            }
          />

          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={SavedMovies}
                savedMovies={savedMovies}
                onDelete={handleDeleteMovie}
              />
            }
          />

          <Route
            path='/profile'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Profile}
                onLogout={handleLogout}
                onEditProfile={handleEditProfile}
              />
            }
          />

          <Route path='/signin' element={<Login onLogin={handleLogin} />} />
          <Route path='/signup' element={<Register onRegister={handleRegister} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        {!hideForFooter.includes(location.pathname) && <Footer />}
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isErr={err}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;