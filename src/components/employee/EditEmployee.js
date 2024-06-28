import React from 'react';
import ReusableForm from './ReusableForm';

function EditEmployee({ employeeData, goBack, updateEmployee }) {
  const handleSubmit = (updatedEmployeeData) => {
    updateEmployee(employeeData.id, updatedEmployeeData);
    goBack();
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <ReusableForm
        initialData={employeeData}
        handleSubmit={handleSubmit}
        buttonLabel="Update Employee"
        goBack={goBack}
      />
      <button onClick={goBack}>Cancel</button>
    </div>
  );
}

export default EditEmployee;
