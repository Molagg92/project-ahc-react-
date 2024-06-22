import React from "react";
import { useState } from "react";
import { db } from '../../config/firebase';
import{ collection, addDoc } from 'firebase/firestore';

function CreateClient({ goBack, addClient }) {
  const [newClientName,setNewClientName ] = useState("");
  const [newClientPhone,setNewClientPhone ] = useState(null);
  const [newClientHomeAddress,setNewClientHomeAddress ] = useState("");
  const [newClientEmailAddress,setNewClientEmailAddress ] = useState("");

  const onClientSubmit = async () => {
    const clientCollectionRef = collection(db, "client");
    try {
      const docRef = await addDoc(clientCollectionRef, {
        name: newClientName,
        phoneNumber: newClientPhone,
        email: newClientEmailAddress,
        homeAddress: newClientHomeAddress,
      });
      addClient({ 
        name: newClientName, 
        phoneNumber: newClientPhone,
        email: newClientEmailAddress,
        homeAddress: newClientHomeAddress,
        id: docRef.id 
      });
      setNewClientName("");
      setNewClientPhone(null);
      setNewClientEmailAddress("");
      setNewClientHomeAddress("");
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
        placeholder="Name"
        value={newClientName}
        onChange={(e) => setNewClientName(e.target.value)}
      />
      <input
        placeholder="Phone Number"
        type="number"
        value={newClientPhone}
        onChange={(e) => setNewClientPhone(Number(e.target.value))}
      />
      <input
        placeholder="Email Address"
        value={newClientEmailAddress}
        onChange={(e) => setNewClientEmailAddress(e.target.value)}
      />
      <input
        placeholder="Home Address"
        value={newClientHomeAddress}
        onChange={(e) => setNewClientHomeAddress(e.target.value)}
      />
      <br></br>
      <button onClick={onClientSubmit}> Submit Client </button>
      <button onClick={goBack}>Go Back</button>
    </div>
  </div>
    
  );
}

export default CreateClient;