import React from "react";
import { useState, useEffect } from "react";
import { db } from '../../config/firebase';
import{ getDocs, collection, addDoc } from 'firebase/firestore';

function Client({ goBack }) {
  const [clientList, setClientList] = useState([]);
  const [newClientName,setNewClientName ] = useState("");

  const clientCollectionRef = collection(db, "client");

  const getClientList = async () => {
    try {
      const data = await getDocs(clientCollectionRef);
      const specifitData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setClientList(specifitData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getClientList();
  }, []);

  const onClientSubmit = async () => {
    try {
      await addDoc(clientCollectionRef, {
        name: newClientName,
      });
      getClientList();
    } catch (err){
      console.error(err);
    }
  };

  return(
  <div>
   <div>
    <h2>Client Page</h2>
    <input
      placeholder="Name?"
      onChange={(e) => setNewClientName(e.target.value)}
    />
    <button onClick={onClientSubmit}> Submit Client </button>
    </div>
      {clientList.map((client) => (
        <div key={client.id}>
          <p>{client.name}</p>
        </div>
      ))}
    <button onClick={goBack}>Go Back to Home</button>
    </div>
  );
}

export default Client;