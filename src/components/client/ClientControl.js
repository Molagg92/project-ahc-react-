import React, { useState, useEffect } from 'react';
import CreateClient from './CreateClient';
import ClientDetails from './ClientDetails';
import{ getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';

function ClientControl({ navigateHome  }) {
  const [currentOperation, setCurrentOperation] = useState('control')
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const clientCollectionRef = collection(db, 'client');

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

  const addClient = (newClient) => {
    setClientList((prevList) => [...prevList, newClient]);
  }

  const renderOperationPage = () => {
    if (currentOperation === 'create') {
      return <CreateClient
              goBack={() => setCurrentOperation('control')}
              addClient={addClient}
             />
    }
    if (currentOperation === 'details') {
      return <ClientDetails 
              clientId={selectedClient.id} 
              goBack={() => setCurrentOperation('control')} 
             />
    }
    return (
      <div>
        <h2> Client Control Page</h2>
        <button onClick={() => setCurrentOperation('create')}>Create Client</button>
        <button onClick={navigateHome}>Go Back to Home</button>
        {clientList.map((client) => (
          <div key={client.id}>
          <p>{client.name}</p>
          <p>{client.phoneNumber}</p>
          <button onClick={() => { setSelectedClient(client); setCurrentOperation('details'); }}>Details</button>
          </div>
      ))}
      </div>
    )
  }

  return (
    <div>
      {renderOperationPage()}
    </div>
  );
}
export default ClientControl;