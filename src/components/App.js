import React, { useState } from "react";
import Home from "./Home";
import ClientControl from "./client/ClientControl";

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateHome = () => {
    setCurrentPage('home');
  };


  const renderPage = () => {
    if (currentPage === 'home') {
      return <Home navigate={() => setCurrentPage('control')} />;
    } else if (currentPage === 'control'){
      return <ClientControl navigateHome={navigateHome} />
    }
  }
  return (
    <>
    {renderPage()}
    </>
  );
}

export default App;
