// Client Control
import React, { useState, useEffect } from 'react';
import{ getDocs, collection, doc,  updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import CreateClient from './CreateClient';
import EditClient from './EditClient';
import DeleteClient from './DeleteClient';
import ClientDetails from './ClientDetails';
// import useClientServices from '../../hooks/useClientServices';


function ClientControl({ navigateHome  }) {
  const [currentOperation, setCurrentOperation] = useState('clientControl')
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
      console.log("Client List: ", specificData); // Debug Log
    } catch (err) {
      console.error("Error fetching clients: ", err);
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
      setCurrentOperation('clientDetails');
    } catch (err) {
      console.error('Error updateding client: ', err);
    }
  };

  const goToUpdate = (client) => {
    setSelectedClient(client);
    setCurrentOperation('clientEdit');
  };

  const removeClient = (clientId) => {
    setClientList((prevList) => prevList.filter(client => client.id !== clientId));
  };

  const goToDelete = (client) => {
    setSelectedClient(client);
    setCurrentOperation('clientDelete');
  };

  //   //==== JOIN FUNCTINALITY ====//
  // const joinClientInService = async (clientId, serviceId) => {
  //   try {
  //     const joinTableCollectionRef = collection(db, "joinClientService");
  //     await addDoc(joinTableCollectionRef, {
  //       clientId: String(clientId),
  //       serviceId: String(serviceId),
  //     });
  //     alert("Client Enrolled in Service!");
  //   } catch (err) {
  //     console.error("Error enrolling client: ", err);
  //   }
  // };

  // const handleJoin = async (clientId) => {
  //   if(selectedService) {
  //     await joinClientInService(clientId, selectedService);
  //   } else {
  //     alert("Please Select a Service.");
  //   }
  // };

  //======== RENDER FUNCTION ========//

  const renderOperationPage = () => {
    if (currentOperation === 'clientCreate') {
      return <CreateClient
              goBack={() => setCurrentOperation('clientControl')}
              addClient={addClient}
             />
    }
    if (currentOperation === 'clientDetails') {
      return <ClientDetails 
              clientId={selectedClient.id} 
              goBack={() => setCurrentOperation('clientControl')} 
              goToDelete={() => goToDelete(selectedClient)}
              goToUpdate={() => setCurrentOperation('clientEdit')}
             />
    }
    if (currentOperation === 'clientEdit') {
      return (
        <EditClient
        clientData={selectedClient}
        goBack={() => setCurrentOperation('clientDetails')}
        updateClient={updateClient}
      />
      );
    }
    if (currentOperation === 'clientDelete') {
      return (
        <DeleteClient
          clientId={selectedClient.id}
          clientName={selectedClient.name}
          goBack={() => setCurrentOperation('clientControl')}
          removeClient={removeClient}
        />
      );
    }
    return (
      <div>
        <h2> Client Control Page</h2>
        <button onClick={() => setCurrentOperation('clientCreate')}>Create Client</button>
        <button onClick={navigateHome}>Go Back to Home</button>
        {clientList.map((client) => (
          <div key={client.id}>
          <b>{client.name}</b>
          <p>{client.phoneNumber}</p>
          <button onClick={() => { setSelectedClient(client); setCurrentOperation('clientDetails'); }}>Details</button>
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