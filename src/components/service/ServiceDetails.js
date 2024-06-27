import React, { useState, useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

function ServiceDetails({ serviceId, goBack, goToDelete, goToUpdate }) {
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const getServiceDetails = async (id) => {
    const serviceDocRef = doc(db, "service", id);
    try {
      const docSnap = await getDoc(serviceDocRef);
      if (docSnap.exists()) {
        setServiceDetails(docSnap.data());
      } else {
        console.log("No Such document!")
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServiceDetails(serviceId);
  }, [serviceId]);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Service Details Page</h2>
      <p>Date and Time: {serviceDetails.dateTime}</p>
      <p>Address: {serviceDetails.address}</p>
      <p>Deep Clean: {serviceDetails.deepClean ? "Yes" : "No"}</p>
      <button onClick={goBack}>Go Back</button>
      <button onClick={goToDelete}>Delete Service</button>
      <button onClick={goToUpdate}>Update Service</button>
    </div>
  );
}

export default ServiceDetails;