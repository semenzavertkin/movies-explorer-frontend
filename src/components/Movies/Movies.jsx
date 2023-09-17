import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import cards from '../../utils/Movies';
import Footer from '../Footer/Footer';


const Movies = () => {
  return (
    <>
      <Header loggedIn={false} />
      <main className="movies">
        <SearchForm />
        <MoviesCardList cards={cards} />
      </main>
      <Footer />
    </>
  );
};

export default Movies;