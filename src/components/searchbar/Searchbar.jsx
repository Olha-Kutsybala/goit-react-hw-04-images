import { useState } from 'react';
import css from './Searchbar.module.css';

const Searchbar = ({ handleSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => setValue(value);

  const handleSubmit = async evt => {
    evt.preventDefault();
    handleSearch(value.trim());
    setValue('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} role="search" onSubmit={handleSubmit}>
        <button type="submit" className={css.searchForm_button}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="100%"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
          </svg>
        </button>

        <input
          className={css.searchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
          aria-label="Search"
        />
      </form>
    </header>
  );
};

export default Searchbar;
