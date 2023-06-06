import './App.css';
import React, { useState, useEffect, useRef } from 'react';

function App() {

  // State variables
  const [textInput, setTextInput] = useState('');
  const [randomJoke, setRandomJoke] = useState('');
  const [randomChuckNorrisJoke, setRandomChuckNorrisJoke] = useState('');
  const [randomManateeJoke, setRandomManateeJoke] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Ref variables for reference to scroll there
  const jokesRef = useRef(null);
  const chuckNorrisJokesRef = useRef(null);
  const manateeJokesRef = useRef(null);
  const savedJokesRef = useRef(null);

  // Check if there are saved jokes, get them from localstorage, otherwise initialize empty Set to ensure uniquness
  const [savedJokes, setSavedJokes] = useState(() => {
    const savedJokesFromStorage = localStorage.getItem('savedJokes');
    return savedJokesFromStorage ? new Set(JSON.parse(savedJokesFromStorage)) : new Set();
  });

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

  // Call Manatee Jokes API with vite_api_key;
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

      setRandomManateeJoke(`${manateeSetUp} ${manateePunchLine}`);
    } catch (error) {
      console.error(error);
      setRandomManateeJoke("Failed to fetch joke :(");
      setErrorMessage("Failed to fetch joke :(");
    }
  };

  // Handle form submission depending on user's input
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

  // Handle save joke click to localStorage
  const saveJoke = () => {
    if (randomJoke) {
      setSavedJokes((prevSavedJokes) => {
        const newSavedJokes = new Set([...prevSavedJokes, randomJoke]);
        localStorage.setItem('savedJokes', JSON.stringify([...newSavedJokes]));
        return newSavedJokes;
      });
    }

    if (randomChuckNorrisJoke) {
      setSavedJokes((prevSavedJokes) => {
        const newSavedJokes = new Set([...prevSavedJokes, randomChuckNorrisJoke]);
        localStorage.setItem('savedJokes', JSON.stringify([...newSavedJokes]));
        return newSavedJokes;
      });
    }

    if (randomManateeJoke) {
      setSavedJokes((prevSavedJokes) => {
        const newSavedJokes = new Set([...prevSavedJokes, randomManateeJoke]);
        localStorage.setItem('savedJokes', JSON.stringify([...newSavedJokes]));
        return newSavedJokes;
      });
    }
    savedJokesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // handle delete of saved jokes from localStorage (update savedJokes Set)
  const deleteJoke = (joke) => {
    setSavedJokes((prevSavedJokes) => {
      const updatedSavedJokes = new Set([...prevSavedJokes]);
      updatedSavedJokes.delete(joke);
      localStorage.setItem('savedJokes', JSON.stringify([...updatedSavedJokes]));
      return updatedSavedJokes;
    });
  };

  // Scroll to the first page anchor when savedJokes becomes empty
  useEffect(() => {
    if (savedJokes.size === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [savedJokes]);

  // Stick the navbar to the top if the user scrolls down and unstick if the user scrolls up
  useEffect(() => {
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
        {savedJokes.size > 0 && <a href='#savedJokes'>Saved Jokes</a>}
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
        {savedJokes.size > 0 && (
          <section id='savedJokes' ref={savedJokesRef}>
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
        )}
      </div>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default App;
