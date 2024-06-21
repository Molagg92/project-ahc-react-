import React from 'react';

function Home({ navigate }) {
  return (
    <div>
      <h1>Home Page!</h1>
      <button onClick={navigate}> Go To Client Page</button>
    </div>
  )
}

export default Home;
