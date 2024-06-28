import React, { useState, useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

function EmployeeDetails({ employeeId, goBack, goToDelete, goToUpdate }) {
  const[employeeDetails, setEmployeeDetails] = useState(null);
  const[loading, setLoading] = useState(true);

  const getEmployeeDetails = async (id) => {
    const employeeDocRef = doc(db, "employee", id);
    try{
      const docSnap = await getDoc(employeeDocRef);
      if (docSnap.exists()) {
        setEmployeeDetails(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployeeDetails(employeeId);
  }, [employeeId]);

  if (loading) {
    return <div>Loading...</div>;
  }
 
  return(
    <div>
      <h2>Employee Details Page</h2>
      <p>Name: {employeeDetails.name}</p>
      <p>Phone: {employeeDetails.phoneNumber}</p>
      <p>Address: {employeeDetails.homeAddress}</p>
      <p>Email: {employeeDetails.email}</p>
      <button onClick={goBack}>Go Back</button>
      <button onClick={goToDelete}>Delete Employee</button>
      <button onClick={goToUpdate}>Update Employee</button>
    </div>
  );
}

export default EmployeeDetails;