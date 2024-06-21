import React from "react";
import { useState } from "react";
import { db } from '../../config/firebase';
import{ collection, addDoc } from 'firebase/firestore';

function CreateClient({ goBack, addClient }) {
  const [newClientName,setNewClientName ] = useState("");

  const onClientSubmit = async () => {
    const clientCollectionRef = collection(db, "client");
    try {
      const docRef = await addDoc(clientCollectionRef, {
        name: newClientName,
      });
      addClient({ name: newClientName, id: docRef.id });
      setNewClientName("");
      goBack();
    } catch (err){
      console.error(err);
    }
  };

  return(
  <div>
    <div>
      <h2>Create Client Page</h2>
      <input
        placeholder="Name?"
        value={newClientName}
        onChange={(e) => setNewClientName(e.target.value)}
      />
      <button onClick={onClientSubmit}> Submit Client </button>
      <button onClick={goBack}>Go Back</button>
    </div>
  </div>
    
  );
}

export default CreateClient;