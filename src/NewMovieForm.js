import {useState} from 'react';

export default function NewMovieForm({onCreate}) {
  const [inputText, setInputText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (onCreate) {
      onCreate(inputText);
    }
    setInputText('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        New movie title
        <input
          type="text"
          placeholder="New movie title"
          data-cy="new-movie-title-field"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
      </label>
      <button type="submit" data-cy="save-movie-button">
        Save
      </button>
    </form>
  );
}
