// EditClient.js
import React from 'react';
import ReusableForm from './ReusableForm';

function EditClient({ clientData, goBack, updateClient }) {
  const handleSubmit = (updatedClientData) => {
    updateClient(clientData.id, updatedClientData);
    goBack();
  };

  return (
    <div>
      <h2>Edit Client</h2>
      <ReusableForm
        initialData={clientData}
        handleSubmit={handleSubmit}
        buttonLabel="Update Client"
        goBack={goBack}
      />
      <button onClick={goBack}>Cancel</button>
    </div>
  );
}

export default EditClient;
