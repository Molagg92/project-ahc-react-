import React, { useState, useEffect } from 'react';
import{ getDocs, collection, doc,  updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import CreateService from './CreateService';
import DeleteService from './DeleteService';
import ServiceDetails from './ServiceDetails';

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

  const removeService = (serviceId) => {
    setServiceList((prevList) => prevList.filter(service => service.id !== serviceId));
  };

  const goToDelete = (service) => {
    setSelectedService(service);
    setCurrentOperation('serviceDelete')
  }

  // RENDER OPERATION FUNCTION
  const renderOperationPage = () => {
    if (currentOperation === 'serviceCreate') {
      return <CreateService
              goBack={() => setCurrentOperation('serviceControl')}
              addService={addService}
            />
    }
    if (currentOperation === 'serviceDelete') {
      return (
        <DeleteService 
          serviceId={selectedService.id}
          serviceDateTime={selectedService.dateTime}
          goBack={() => setCurrentOperation('serviceControl')}
          removeService={removeService}
        />
      )
    }
    if (currentOperation === 'serviceDetails') {
      return <ServiceDetails
              serviceId={selectedService.id}
              goBack={() => setCurrentOperation('serviceControl')}
              goToDelete={() => goToDelete(selectedService)}s
              // goToUpdate={() => setCurrentOperation('serviceEdit')}
            />
    }
    return (
      <div>
        <h2> Service Control Page</h2>
        <button onClick={() => setCurrentOperation('serviceCreate')}>Create Service</button>
        <button onClick={navigateHome}>Go Back to Home</button>
        {serviceList.map((service) => (
          <div key={service.id}>
          <b>{service.address}</b>
          <p>{service.dateTime}</p>
          <p>{service.deepClean}</p>
          <button onClick={() => { setSelectedService(service); setCurrentOperation('serviceDetails'); }}>Details</button>
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