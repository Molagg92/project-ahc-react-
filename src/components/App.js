import React, { useState } from "react";
import Home from "./Home";
import ClientControl from "./client/ClientControl";
import ServiceControl from "./service/ServiceControl";
import EmployeeControl from "./employee/EmployeeControl";

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateHome = () => {
    setCurrentPage('home');
  };

  const navigateClientControl = () => {
    setCurrentPage('clientControl');
  };

  const navigateServiceControl = () => {
    setCurrentPage('serviceControl');
  };

  const navigateEmployeeControl = () => {
    setCurrentPage('employeeControl');
  };
  
  const renderPage = () => {
    if (currentPage === 'home') {
      return <Home navigateClientControl={navigateClientControl} navigateServiceControl={navigateServiceControl} navigateEmployeeControl={navigateEmployeeControl} />;
    } else if (currentPage === 'clientControl'){
      return <ClientControl navigateHome={navigateHome} />;
    } else if (currentPage === 'serviceControl'){
      return <ServiceControl navigateHome={navigateHome} />;
    } else if (currentPage === 'employeeControl'){
      return <EmployeeControl navigateHome={navigateHome} />;
    } 
  };
  
  return (
    <>
    {renderPage()}
    </>
  );
}

export default App;
