import React, { useState, useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

function ClientDetails({ clientId, goBack }) {
  const [clientDetails, setClientDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <h2>Client Details Page</h2>
      <p>Name: {clientDetails.name}</p>
      <p>Phone: {clientDetails.phoneNumber}</p>
      <p>Address: {clientDetails.homeAddress}</p>
      <p>Email: {clientDetails.email}</p>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
}

export default ClientDetails;
