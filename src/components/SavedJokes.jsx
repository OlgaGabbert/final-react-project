import React from 'react';

const SavedJokes = ({ savedJokes, deleteJoke }) => {
  return (
    <section id='savedJokes'>
            <article>
              <div>
                <h3>Saved Jokes:</h3>
                <ul>
                  {[...savedJokes].map((joke, index) => (
                    <li key={index}>
                      {joke}
                      <button onClick={() => deleteJoke(joke)}>Delete</button>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </section>
  );
};

export default SavedJokes;