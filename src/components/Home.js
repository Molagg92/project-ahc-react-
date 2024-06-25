import React from 'react';

function Home({ navigate }) {
  return (
    <div>
      <h1>Home Page!</h1>
      <button onClick={navigate}> Go To Client Page</button>
      <button onClick={navigate}> Go To Service Page</button>
    </div>
  )
}

export default Home;
