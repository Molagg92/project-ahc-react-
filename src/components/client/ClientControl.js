// Client Control
import React, { useState, useEffect } from 'react';
import{ getDocs, collection, doc,  updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import CreateClient from './CreateClient';
import EditClient from './EditClient';
import DeleteClient from './DeleteClient';
import ClientDetails from './ClientDetails';



function ClientControl({ navigateHome  }) {
  const [currentOperation, setCurrentOperation] = useState('control')
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const clientCollectionRef = collection(db, 'client');

  const getClientList = async () => {
    try {
      const data = await getDocs(clientCollectionRef);
      const specificData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setClientList(specificData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getClientList();
  }, []);

  const addClient = (newClient) => {
    setClientList((prevList) => [...prevList, newClient]);
  };

  const updateClient = async (clientId, updatedClientData) => {
    try {
      const clientDocRef = doc(db,'client', clientId );
      await updateDoc(clientDocRef, updatedClientData);
      getClientList();
      setCurrentOperation('details');
    } catch (err) {
      console.error('Error updateding client: ', err);
    }
  };

  const goToUpdate = (client) => {
    setSelectedClient(client);
    setCurrentOperation('update');
  };

  const removeClient = (clientId) => {
    setClientList((prevList) => prevList.filter(client => client.id !== clientId));
  };

  const goToDelete = (client) => {
    setSelectedClient(client);
    setCurrentOperation('delete');
  };

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
              goToDelete={() => goToDelete(selectedClient)}
              goToUpdate={() => setCurrentOperation('update')}
             />
    }
    if (currentOperation === 'update') {
      return (
        // <ReusableForm
        //   initialData={selectedClient}
        //   handleSubmit={(updatedClient) => updateClient(selectedClient.id, updatedClient)}
        //   buttonLabel="Update Client"
        //   goBack={() => setCurrentOperation('control')}
        // />
        <EditClient
        clientData={selectedClient}
        goBack={() => setCurrentOperation('details')}
        updateClient={updateClient}
      />
      );
    }
    if (currentOperation === 'delete') {
      return (
        <DeleteClient
          clientId={selectedClient.id}
          clientName={selectedClient.name}
          goBack={() => setCurrentOperation('control')}
          removeClient={removeClient}
        />
      );
    }
    return (
      <div>
        <h2> Client Control Page</h2>
        <button onClick={() => setCurrentOperation('create')}>Create Client</button>
        <button onClick={navigateHome}>Go Back to Home</button>
        {clientList.map((client) => (
          <div key={client.id}>
          <b>{client.name}</b>
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