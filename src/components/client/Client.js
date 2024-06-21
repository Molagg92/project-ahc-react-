import React from "react";
import { useState, useEffect } from "react";
import { db } from '../../config/firebase';
import{ getDocs, collection, addDoc } from 'firebase/firestore';

function Client() {
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
    <input
      placeholder="Name?"
      onChange={(e) => setNewClientName(e.target.value)}
    />
    <button onClick={onClientSubmit}> Submit Client </button>
    </div>
      {clientList.map((client) => (
        <div key={client.id}>
          <h1>{client.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default Client;