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
      return <Home navigate={() => setCurrentPage('clientControl')} />;
    } else if (currentPage === 'clientControl'){
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
