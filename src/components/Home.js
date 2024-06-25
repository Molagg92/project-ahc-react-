import React from 'react';

function Home({ navigateClientControl, navigateServiceControl }) {
  return (
    <div>
      <h1>Home Page!</h1>
      <button onClick={navigateClientControl}> Go To Client Page</button>
      <br />
      <button onClick={navigateServiceControl}> Go To Service Page</button>
    </div>
  )
}

export default Home;
