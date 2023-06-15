import './App.css';
import React, { useState, useEffect, useRef } from 'react';

import Navbar from './components/Navbar';
import Content from './components/Content';
import Header from './components/Header';
import SavedJokes from './components/SavedJokes'

function App() {

  // State variables for parts of the page to be updated

  // Handle OnChange value to capture user's input/choice of jokes
  const [textInput, setTextInput] = useState('');

  // Fetched jokes from different APIs
  const [randomJoke, setRandomJoke] = useState('');
  const [randomChuckNorrisJoke, setRandomChuckNorrisJoke] = useState('');
  const [randomManateeJoke, setRandomManateeJoke] = useState('');

  // Handle errors depending on the error
  const [errorMessage, setErrorMessage] = useState('');

  // Handle scrolling or not to the saved jokes
  const [scrollToSavedJokes, setScrollToSavedJokes] = useState(false);

  // Check if there are saved jokes, get them from localStorage, otherwise initialize empty Set to ensure uniquness
  const [savedJokes, setSavedJokes] = useState(() => {
    const savedJokesFromStorage = localStorage.getItem('savedJokes'); // string representation of jokes out localStorage
    return savedJokesFromStorage ? new Set(JSON.parse(savedJokesFromStorage)) : new Set(); // parses into array to then create Set out of it to ensure jokes are unique
  });

  // Ref variables for reference to scroll there
  const jokesRef = useRef(null);
  const chuckNorrisJokesRef = useRef(null);
  const manateeJokesRef = useRef(null);
  const savedJokesSectionRef = useRef(null);

  // Call Dad Jokes API
  const fetchRandomJoke = async () => {
    try {
      const response = await fetch("https://icanhazdadjoke.com", { // API URL
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }

      const joke = await response.json();
      const myRandomJoke = joke.joke;

      setRandomJoke(myRandomJoke); // update the state variable with fetched item
      setErrorMessage(""); // set Error state variable to empty
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
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setRandomChuckNorrisJoke("Failed to fetch joke :(");
      setErrorMessage("Failed to fetch joke :(");
    }
  };

  // Call Manatee Jokes API with vite_api_key;
  const fetchManateeJoke = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY; // retrieve the API key from the environment variables
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
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setRandomManateeJoke("Failed to fetch joke :(");
      setErrorMessage("Failed to fetch joke :(");
    }
  };

  // Handle form submission depending on user's input
  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = textInput.toLowerCase(); // for case-insensitive comparison

    try {
      if (text === 'dad') {
        await fetchRandomJoke(); //"await" to wait for the asynchronous fetch functions to complete before scrolling 
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
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Helper function to save a joke to localStorage
  const saveJokeToLocalStorage = (joke, setSavedJokes) => {
    setSavedJokes(prevSavedJokes => { // update the state using previous state 
      const newSavedJokes = new Set([...prevSavedJokes, joke]); // use previously saved jokes by spreading the elements into a new array
      localStorage.setItem('savedJokes', JSON.stringify([...newSavedJokes])); // localStorage stores only string data
      return newSavedJokes;
    });
  }

  // Save random joke to localStorage
  const saveRandomJoke = () => {
    if (randomJoke) {
      saveJokeToLocalStorage(randomJoke, setSavedJokes);
    }
    setScrollToSavedJokes(true);
  };

  // Save random Chuck Norris joke to localStorage
  const saveRandomChuckNorrisJoke = () => {
    if (randomChuckNorrisJoke) {
      saveJokeToLocalStorage(randomChuckNorrisJoke, setSavedJokes);
    }
    setScrollToSavedJokes(true);
  };

  // Save random Manatee joke to localStorage
  const saveRandomManateeJoke = () => {
    if (randomManateeJoke) {
      saveJokeToLocalStorage(randomManateeJoke, setSavedJokes);
    }
    setScrollToSavedJokes(true);
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

  // Checks if the scrollToSavedJokes updates (dependency) and scrolls to savedJokes, setScroll to false after 
  useEffect(() => {
    if (scrollToSavedJokes && savedJokesSectionRef.current) {
      savedJokesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      setScrollToSavedJokes(false);
    }
  }, [scrollToSavedJokes]);

  // Stick the navbar to the top if the user scrolls down and unstick if the user scrolls up 
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
  
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      const navbarOffset = navbar.offsetTop;
      const currentScrollPos = window.pageYOffset;
  
      if (currentScrollPos >= navbarOffset) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
  
      if (currentScrollPos < prevScrollPos) {
        navbar.classList.remove('sticky');
      }
  
      prevScrollPos = currentScrollPos;
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div>
      <Header
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
        textInput={textInput}
        setTextInput={setTextInput}
      />
      <Navbar savedJokesCount={savedJokes.size} />
      <Content
        randomJoke={randomJoke}
        randomChuckNorrisJoke={randomChuckNorrisJoke}
        randomManateeJoke={randomManateeJoke}
        fetchRandomJoke={fetchRandomJoke}
        fetchChuckNorrisJoke={fetchChuckNorrisJoke}
        fetchManateeJoke={fetchManateeJoke}
        saveRandomJoke={saveRandomJoke}
        saveRandomChuckNorrisJoke={saveRandomChuckNorrisJoke}
        saveRandomManateeJoke={saveRandomManateeJoke}
        jokesRef={jokesRef}
        chuckNorrisJokesRef={chuckNorrisJokesRef}
        manateeJokesRef={manateeJokesRef}
      />
      {savedJokes.size > 0 && (
        <div ref={savedJokesSectionRef} >
          <SavedJokes
            savedJokes={savedJokes}
            deleteJoke={deleteJoke}
          />
        </div>
      )}
    </div>
  );
}

export default App;
