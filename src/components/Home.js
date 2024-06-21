import React, { useState } from 'react';
import Client from '../components/client/Client';

function Home() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    if (currentPage === 'home') {
      return (
        <div>
          <h1>Home Page!</h1>
          <button onClick={() => setCurrentPage('client')}> Go To Client Page</button>
        </div>
      )
    } else if (currentPage === 'client'){
      return <Client />
    }
  }
  return (
    <>
    {renderPage()}
    </>
  );
}

export default Home;
