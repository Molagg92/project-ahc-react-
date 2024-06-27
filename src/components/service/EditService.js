import React from 'react';
import ReusableForm from './ReusableForm';

function EditService({ serviceData, goBack, updateService }) {
  const handleSubmit = (updatedServiceData) => {
    updateService(serviceData.id, updatedServiceData);
    goBack();
  };

  return (
    <div>
      <h2>Edit Service</h2>
      <ReusableForm
        initialData={serviceData}
        handleSubmit={handleSubmit}
        buttonLabel="Update Service"
        goBack={goBack}
      />
      <button onClick={goBack}>Cancel</button>
    </div>
  );
}

export default EditService;
