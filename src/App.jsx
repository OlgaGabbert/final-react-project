import './App.css';
import React, { useState, useEffect, useRef } from 'react';

function App() {

  // State variables for the hooks
  const [textInput, setTextInput] = useState('');
  const [randomJoke, setRandomJoke] = useState('');
  const [randomChuckNorrisJoke, setRandomChuckNorrisJoke] = useState('');
  const [randomManateeJoke, setRandomManateeJoke] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [savedJokes, setSavedJokes] = useState(new Set());

  const jokesRef = useRef(null);
  const chuckNorrisJokesRef = useRef(null);
  const manateeJokesRef = useRef(null);

  // Call Dad Jokes API

  const fetchRandomJoke = async () => {
    try {
      const response = await fetch("https://icanhazdadjoke.com", {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }

      const joke = await response.json();
      const myRandomJoke = joke.joke;

      setRandomJoke(myRandomJoke);
    } catch (error) {
      console.error(error);
      setRandomJoke("Failed to fetch joke :(");
      setErrorMessage("Failed to fetch joke :(");
    }
  };

  // Call Chuck Norris API
  const fetchChuckNorrisJoke = async () => {
    try {
      const response = await fetch(
        "https://api.chucknorris.io/jokes/random"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }

      const chuckNorrisJoke = await response.json();
      const myRandomChuckNorrisJoke = chuckNorrisJoke.value;

      setRandomChuckNorrisJoke(myRandomChuckNorrisJoke);
    } catch (error) {
      console.error(error);
      setRandomChuckNorrisJoke("Failed to fetch joke :(");
      setErrorMessage("Failed to fetch joke :(");
    }
  };

  // Call Manatee Jokes API
  const fetchManateeJoke = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        "https://manatee-jokes.p.rapidapi.com/manatees/random",
        {
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "manatee-jokes.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }

      const manateeJoke = await response.json();
      const manateeSetUp = manateeJoke.setup;
      const manateePunchLine = manateeJoke.punchline;

      setRandomManateeJoke(`${manateeSetUp} <br> ${manateePunchLine}`);
    } catch (error) {
      console.error(error);
      setRandomManateeJoke("Failed to fetch joke :(");
      setErrorMessage("Failed to fetch joke :(");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = textInput.toLowerCase();

    try {
      if (text === 'dad') {
        await fetchRandomJoke();
        jokesRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (text === 'manatee') {
        await fetchManateeJoke();
        manateeJokesRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (text === 'chuck norris') {
        await fetchChuckNorrisJoke();
        chuckNorrisJokesRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        throw new Error('Check your spelling and try again.');
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  // Handle save joke click
  const saveJoke = () => {
    if (randomJoke) {
      setSavedJokes((prevSavedJokes) => new Set([...prevSavedJokes, randomJoke]));
    }

    if (randomChuckNorrisJoke) {
      setSavedJokes((prevSavedJokes) => new Set([...prevSavedJokes, randomChuckNorrisJoke]));
    }

    if (randomManateeJoke) {
      setSavedJokes((prevSavedJokes) => new Set([...prevSavedJokes, randomManateeJoke]));
    }
  };

  useEffect(() => {
    // Stick the navbar to the top if the user scrolls down and unstick if the user scrolls up
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      const header = document.getElementById('header');
      const navbarOffset = navbar.offsetTop;

      if (window.pageYOffset >= navbarOffset) {
        navbar.classList.add('sticky');
        header.classList.add('navbarOffsetMargin');
      } else {
        navbar.classList.remove('sticky');
        header.classList.remove('navbarOffsetMargin');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <nav id="navbar">
        <a href="#">Home</a>
        <a href="#jokes">Get Dad Jokes</a>
        <a href="#chuckNorrisJokes">Get Chuck Norris Jokes</a>
        <a href="#manateeJokes">Get Manatee Jokes</a>
        {savedJokes.length > 0 && <a href='#savedJokes'>Saved Jokes</a>}
      </nav>

      <section id="header">
        <article>
          <h2>Jokes from three joke categories</h2>
          <form onSubmit={handleSubmit} id="myForm">
            <label htmlFor="textInput" id="bot">Type Chuck Norris, Dad, or Manatee to choose a category:</label>
            <input type="text" id="textInput" name="text" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
            <button type="submit" id="submit-button">Submit</button>
          </form>
        </article>
      </section>

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
                    <button onClick={saveJoke}>Save this joke</button>
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
                    <button onClick={saveJoke}>Save this joke</button>
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
                    <button onClick={saveJoke}>Save this joke</button>
                  </div>
                )}
              </div>
            </div>
          </article>
        </section>
          {savedJokes && (
            <section id='savedJokes'>
              <article>
                <div>
                  <h3>Saved Jokes:</h3>
                  <ul>
                    {[...savedJokes].map((joke, index) => (
                      <li key={index}>{joke}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </section>
          )}
      </div>

        {errorMessage && <p>{errorMessage}</p>}
      </div>
  );
}

export default App;