import React, { useState, useEffect } from 'react';
import{ getDocs, collection, doc,  updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import CreateService from './CreateService';

function ServiceControl({ navigateHome }) {
  const [currentOperation, setCurrentOperation] = useState('serviceControl');
  const [serviceList, setServiceList] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const serviceCollectionRef = collection(db, 'service');

  const getServiceList = async () => {
    try{
      const data = await getDocs(serviceCollectionRef);
      const specificData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setServiceList(specificData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() =>{
    getServiceList();
  }, []);

  const addService = (newService) => {
    setServiceList((prevList) => [...prevList, newService]);
  };


  // RENDER OPERATION FUNCTION
  const renderOperationPage = () => {
    if (currentOperation === 'serviceCreate') {
      return <CreateService
              goBack={() => setCurrentOperation('serviceControl')}
              addService={addService}
            />
    }
    return (
      <div>
        <h2> Service Control Page</h2>
        <button onClick={() => setCurrentOperation('serviceCreate')}>Create Service</button>
        <button onClick={navigateHome}>Go Back to Home</button>
        {serviceList.map((service) => (
          <div key={service.id}>
          <b>{service.name}</b>
          <p>{service.phoneNumber}</p>
          {/* <button onClick={() => { setSelectedService(service); setCurrentOperation('serviceDetails'); }}>Details</button> */}
          </div>
      ))}
      </div>
    )
  }

  return (
    <div>
      {renderOperationPage()}
    </div>
  );
}
export default ServiceControl;