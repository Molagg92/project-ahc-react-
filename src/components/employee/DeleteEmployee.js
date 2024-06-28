import React from "react";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

function DeleteEmployee({ employeeId, employeeName, goBack, removeEmployee }) {
  const handleDelete = async () => {
    const employeeDocRef = doc(db, "employee", employeeId);
    try {
      await deleteDoc(employeeDocRef);
      removeEmployee(employeeId);
      goBack();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2> Delete Employee </h2>
      <p>Are you sure you want to delete the employee, <b>{employeeName}</b>?</p>
      <button onClick={handleDelete}> Yes, Delete Employee</button>
      <button onClick={goBack}>No, Go Back</button>
    </>
  );
}

export default DeleteEmployee;