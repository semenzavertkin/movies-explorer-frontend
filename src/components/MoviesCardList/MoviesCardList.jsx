import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';


const MoviesCardList = ({ cards }) => {
  return (
    <section className="cards">
      <ul className="cards__list">
        {cards.map((card) => (
          <MoviesCard key={card.id} card={card} />
        ))}
      </ul>
    </section>
  );
};

export default MoviesCardList;