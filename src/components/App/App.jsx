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



const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const hideForHeader = ['/sign-in', '/sign-up', '/not-found'];
  const hideForFooter = ['/sign-in', '/sign-up', '/profile', '/not-found'];


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
    if (loggedIn && (location.pathname === '/sign-in' || location.pathname === '/sign-up')) {
      navigate('/movies');
    }
  }, [loggedIn, location.pathname, navigate]);

  function handleRegister(name, email, password,) {
    mainApi
      .register(name, email, password,)
      .then((res) => {
        handleLogin(email, password);
      })
      .catch((err) =>
        console.log(err)
      );
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
      })
      .catch((err) =>
        console.log(err)
      );
  }

  function handleSaveMovie(movie) {
    const isSaved = savedMovies.some((item) => item.movieId === movie.id);
    if (savedMovies.some(item => item === undefined)) {
      console.error("В массиве savedMovies есть undefined элементы!");
      return;
    }
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
      } else {
        console.error('Не удалось найти фильм для удаления.');
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
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;