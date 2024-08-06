import React, { useState, useEffect } from 'react';
import { getDocs, collection, doc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import CreateService from './CreateService';
import DeleteService from './DeleteService';
import ServiceDetails from './ServiceDetails';
import EditService from './EditService';

function ServiceControl({ clientId, goBack }) {
  const [currentOperation, setCurrentOperation] = useState('serviceControl');
  const [serviceList, setServiceList] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const fetchServices = async () => {
    try {
      const servicesQuery = query(collection(db, 'service'), where('clientId', '==', clientId));
      const servicesSnapshot = await getDocs(servicesQuery);
      const servicesData = servicesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setServiceList(servicesData);
    } catch (err) {
      console.error("Error fetching services: ", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [clientId]);

  const addService = (newService) => {
    setServiceList(prevList => [...prevList, newService]);
  };

  const removeService = (serviceId) => {
    setServiceList(prevList => prevList.filter(service => service.id !== serviceId));
  };

  const updateService = async (serviceId, updatedServiceData) => {
    try {
      const serviceDocRef = doc(db, 'service', serviceId);
      await updateDoc(serviceDocRef, updatedServiceData);
      fetchServices();  // Refresh the service list after update
      setCurrentOperation('serviceDetails');
    } catch (err) {
      console.error('Error updating service: ', err);
    }
  };

  const goToDelete = (service) => {
    setSelectedService(service);
    setCurrentOperation('serviceDelete');
  };

  const goToUpdate = (service) => {
    setSelectedService(service);
    setCurrentOperation('serviceEdit');
  };

  const renderOperationPage = () => {
    if (currentOperation === 'serviceCreate') {
      return (
        <CreateService
          clientId={clientId}
          goBack={() => setCurrentOperation('serviceControl')}
          addService={addService}
        />
      );
    }
    if (currentOperation === 'serviceDelete') {
      return (
        <DeleteService
          serviceId={selectedService.id}
          goBack={() => setCurrentOperation('serviceControl')}
          removeService={removeService}
        />
      );
    }
    if (currentOperation === 'serviceDetails') {
      return (
        <ServiceDetails
          serviceId={selectedService.id}
          goBack={() => setCurrentOperation('serviceControl')}
          goToDelete={() => goToDelete(selectedService)}
          goToUpdate={() => setCurrentOperation('serviceEdit')}
        />
      );
    }
    if (currentOperation === 'serviceEdit') {
      return (
        <EditService
          serviceData={selectedService}
          goBack={() => setCurrentOperation('serviceDetails')}
          updateService={updateService}
        />
      );
    }
    return (
      <div>
        <h2>Service Control Page</h2>
        <button onClick={() => setCurrentOperation('serviceCreate')}>Create Service</button>
        <button onClick={goBack}>Go Back to Client Details</button>
        {serviceList.map((service) => (
          <div key={service.id}>
            <b>{service.address}</b>
            <p>{service.dateTime}</p>
            <button onClick={() => { setSelectedService(service); setCurrentOperation('serviceDetails'); }}>Details</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderOperationPage()}
    </div>
  );
}

export default ServiceControl;
