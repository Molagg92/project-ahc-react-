import React from "react";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

function DeleteClient({ clientId, clientName, goBack, removeClient }) {
  const handleDelete = async () => {
    const clientDocRef = doc(db, "client", clientId);
    try {
      await deleteDoc(clientDocRef);
      removeClient(clientId);
      goBack();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2> Delete Client </h2>
      <p>Are you sure you want to delete this client, {clientName}?</p>
      <button onClick={handleDelete}> Yes, Delete Client</button>
      <button onClick={goBack}>No, Go Back</button>
    </>
  );
}

export default DeleteClient;