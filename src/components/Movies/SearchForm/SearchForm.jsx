import './SearchForm.css';
import { useState } from 'react';

const SearchForm = (props) => {
  const [inputValue, setInputValue] = useState(props.initialValue || '');
  const [error, setError] = useState(null);
  const handleInputChange = (evt) => {
    const value = evt.target.value;
    setInputValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputValue.trim()) {
      setError('Нужно ввести ключевое слово');
      return;
    }
    setError(null);
    props.onSearch(inputValue);
  };
  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search__form">
        <input className="search__input" id='search-film' placeholder="Фильм" type="text" required
          value={inputValue}
          onChange={handleInputChange} />
        <button type="submit" className="search__button"></button>
      </div>


      <div className="search__toggle">
        <label className="search__tumbler">
          <input className="search__checkbox" id='movies-filter' type="checkbox"
            checked={props.isChecked} onChange={props.setChecked}
          />
          <span className="search__checkmark"></span>
        </label>
        <p className="search__films">Короткометражки</p>
      </div>
      {error && <p className='search__error'>{error}</p>}
    </form>
  );
};

export default SearchForm;