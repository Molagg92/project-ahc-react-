import React, { useState, useEffect } from "react";
import { doc, getDocs, collection, addDoc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import useClientServices from '../../hooks/useClientServices';

function ClientDetails({ clientId, goBack, goToDelete, goToUpdate }) {
  const [clientDetails, setClientDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const clientServices = useClientServices(clientId);

  const getClientDetails = async (id) => {
    const clientDocRef = doc(db, "client", id);
    try {
      const docSnap = await getDoc(clientDocRef);
      if (docSnap.exists()) {
        setClientDetails(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const data = await getDocs(collection(db, 'service'));
      const specificData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setServices(specificData);
    } catch (err) {
      console.error(err);
    }
  };

   const joinClientInService = async (clientId, serviceId) => {
    try {
      const joinTableCollectionRef = collection(db, "joinClientService");
      await addDoc(joinTableCollectionRef, {
        clientId: String(clientId),
        serviceId: String(serviceId),
      });
      alert("Client Enrolled in Service!");
    } catch (err) {
      console.error("Error enrolling client: ", err);
    }
  };

  const handleJoin = async () => {
    if (selectedService) {
      await joinClientInService(clientId, selectedService);
      fetchServices();
    } else {
      alert("Please Select a Service.");
    }
  };

  useEffect(() => {
    getClientDetails(clientId);
    fetchServices();
  }, [clientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Client Details Page</h2>
      <p>Name: {clientDetails.name}</p>
      <p>Phone: {clientDetails.phoneNumber}</p>
      <p>Address: {clientDetails.homeAddress}</p>
      <p>Email: {clientDetails.email}</p>
      <button onClick={goBack}>Go Back</button>
      <button onClick={goToDelete}>Delete Client</button>
      <button onClick={goToUpdate}>Update Client</button>
      
      <h3>Assign Service</h3>
      <select onChange={(e) => setSelectedService(e.target.value)}>
        <option value="">Select a service</option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.address} - {service.dateTime}
          </option>
        ))}
      </select>
      <button onClick={handleJoin}>Assign Service</button>

      <h3>Assigned Services</h3>
      <ul>
        {clientServices.map((service) => (
          <li key={service.id}>
            {service.address} - {service.dateTime}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientDetails;
