import React, { useState, useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import CreateService from '../service/CreateService';

function ClientDetails({ clientId, goBack, goToDelete, goToUpdate }) {
  const [clientDetails, setClientDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateService, setShowCreateService] = useState(false); // State to toggle between views

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

  useEffect(() => {
    getClientDetails(clientId);
  }, [clientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!showCreateService ? (
        <>
          <h2>Client Details Page</h2>
          <p>Name: {clientDetails.name}</p>
          <p>Phone: {clientDetails.phoneNumber}</p>
          <p>Address: {clientDetails.homeAddress}</p>
          <p>Email: {clientDetails.email}</p>
          <button onClick={goBack}>Go Back</button>
          <button onClick={goToDelete}>Delete Client</button>
          <button onClick={goToUpdate}>Update Client</button>
          <button onClick={() => setShowCreateService(true)}>Create Service</button>
        </>
      ) : (
        <CreateService
          goBack={() => setShowCreateService(false)}
          addService={(service) => {
            // Optionally handle adding the service to local state if needed
          }}
          clientId={clientId}
        />
      )}
    </div>
  );
}

export default ClientDetails;
