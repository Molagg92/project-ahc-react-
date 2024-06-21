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
    {/* Form to Add New Client */}
    <form onSubmit={onClientSubmit}>
    <input type="text" value={newClientName} onChange={(e) => setNewClientName(e.target.value)} placeholder="Enter client name" />
    <button type="submit">Add Client</button>
    </form>
    {/*  List of clients! */}
    <ul>
      {clientList.map((client) => (
        <li key={client.id}>{client.name}</li>
      ))}
    </ul>
   </div>
  );
}

export default Client;