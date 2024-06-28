import React from 'react';

function Home({ navigateClientControl, navigateServiceControl, navigateEmployeeControl }) {
  return (
    <div>
      <h1>Home Page!</h1>
      <button onClick={navigateClientControl}> Go To Client Page</button>
      <br />
      <button onClick={navigateServiceControl}> Go To Service Page</button>
      <br />
      <button onClick={navigateEmployeeControl}> Go To Employee Page</button>
    </div>
  )
}

export default Home;
