import React from 'react';

const Content = ({ 
    jokesRef, 
    fetchRandomJoke, 
    randomJoke, 
    saveRandomJoke,
    saveRandomChuckNorrisJoke,
    saveRandomManateeJoke, 
    chuckNorrisJokesRef, 
    fetchChuckNorrisJoke,
    randomChuckNorrisJoke,
    manateeJokesRef,
    fetchManateeJoke,
    randomManateeJoke,
}) => {
  return (
    <div id="content">
        <section id="jokes" ref={jokesRef}>
          <article>
            <div className="getRandomJokes">
              <h2>Get Dad Jokes</h2>
              <div id="getJoke">
                <button onClick={fetchRandomJoke}>Get a Dad Joke</button>
              </div>
            </div>

            <div className="randomJoke">
              <div id="joke-container">
                {randomJoke && (
                  <div>
                    <p>{randomJoke}</p>
                    <button onClick={saveRandomJoke}>Save this joke</button>
                  </div>
                )}
              </div>
            </div>
          </article>
        </section>

        <section id="chuckNorrisJokes" ref={chuckNorrisJokesRef}>
          <article>
            <div className="getRandomJokes">
              <h2>Get Chuck Norris Jokes</h2>
              <div id="getJoke">
                <button onClick={fetchChuckNorrisJoke}>Get a Chuck Norris Joke</button>
              </div>
            </div>

            <div className="randomJoke">
              <div id="chuck-joke-container">
                {randomChuckNorrisJoke && (
                  <div>
                    <p>{randomChuckNorrisJoke}</p>
                    <button onClick={saveRandomChuckNorrisJoke}>Save this joke</button>
                  </div>
                )}
              </div>
            </div>
          </article>
        </section>

        <section id="manateeJokes" ref={manateeJokesRef}>
          <article>
            <div className="getRandomJokes">
              <h2>Get Manatee Jokes</h2>
              <div id="getJoke">
                <button onClick={fetchManateeJoke}>Get a Manatee Joke</button>
              </div>
            </div>

            <div className="randomJoke">
              <div id="manatee-container">
                {randomManateeJoke && (
                  <div>
                    <p>{randomManateeJoke}</p>
                    <button onClick={saveRandomManateeJoke}>Save this joke</button>
                  </div>
                )}
              </div>
            </div>
          </article>
        </section>
      </div>
  );
};

export default Content;