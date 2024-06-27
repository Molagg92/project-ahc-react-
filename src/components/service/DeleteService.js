import React from "react";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

function DeleteService({serviceId, serviceDateTime, goBack, removeService }) {
  const handleDelete = async () => {
    const serviceDocRef = doc(db, "service", serviceId);
    try {
      await deleteDoc(serviceDocRef);
      removeService(serviceId);
      goBack();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2> Delete Service </h2>
      <p>Are you sure you want to delete the service, <b>{serviceDateTime}</b>?</p>
      <button onClick={handleDelete}> Yes, Delete Service</button>
      <button onClick={goBack}>No, Go Back</button>
    </>
  );
}

export default DeleteService;