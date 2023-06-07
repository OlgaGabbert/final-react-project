import React from 'react';

const Header = ({ handleSubmit, textInput, errorMessage, setTextInput }) => {
  return (
    <section id="header">
    <article>
      <h2>Jokes from three joke categories</h2>
      <form onSubmit={handleSubmit} id="myForm">
        <label htmlFor="textInput" id="bot">Type Chuck Norris, Dad, or Manatee to choose a category:</label>
        <input type="text" id="textInput" name="text" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
        <button type="submit" id="submit-button">Submit</button>
      </form>
      {errorMessage && <p className='error'>{errorMessage}</p>}
    </article>
  </section>
  );
};

export default Header;