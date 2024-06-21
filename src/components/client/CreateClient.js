import React from "react";
import { useState } from "react";
import { db } from '../../config/firebase';
import{ collection, addDoc } from 'firebase/firestore';

function CreateClient({goBack}) {
  const [newClientName,setNewClientName ] = useState("");

  const onClientSubmit = async () => {
    const clientCollectionRef = collection(db, "client");
    try {
      await addDoc(clientCollectionRef, {
        name: newClientName,
      });
      setNewClientName("");
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
        onChange={(e) => setNewClientName(e.target.value)}
      />
      <button onClick={onClientSubmit}> Submit Client </button>
      <button onClick={goBack}>Go Back</button>
    </div>
  </div>
    
  );
}

export default CreateClient;