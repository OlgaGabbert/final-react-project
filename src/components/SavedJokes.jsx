import React from 'react';

const SavedJokes = ({ savedJokes, deleteJoke }) => {
  return (
    <section id='savedJokes'>
            <article>
              <div>
                <h2>Saved Jokes</h2>
                <ol>
                  {[...savedJokes].map((joke, index) => (
                    <li key={index}>
                      {joke}
                      <button onClick={() => deleteJoke(joke)}>Delete</button>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          </section>
  );
};

export default SavedJokes;