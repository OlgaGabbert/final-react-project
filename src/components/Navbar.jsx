import React from 'react';

const Navbar = ({ savedJokesCount }) => {
  return (
    <nav id="navbar">
      <a href="#">Home</a>
      <a href="#jokes">Get Dad Jokes</a>
      <a href="#chuckNorrisJokes">Get Chuck Norris Jokes</a>
      <a href="#manateeJokes">Get Manatee Jokes</a>
      {savedJokesCount > 0 && <a href="#savedJokes">Saved Jokes</a>}
    </nav>
  );
};

export default Navbar;
