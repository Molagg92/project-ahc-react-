import React, { useState } from "react";
import { db } from '../../config/firebase';
import{ collection, addDoc } from 'firebase/firestore';


function CreateEmployee({goBack, addEmployee}) {
  const [newEmployeeName,setNewEmployeeName ] = useState("");
  const [newEmployeePhone,setNewEmployeePhone ] = useState(null);
  const [newEmployeeHomeAddress,setNewEmployeeHomeAddress ] = useState("");
  const [newEmployeeEmailAddress,setNewEmployeeEmailAddress ] = useState("");

  const onEmployeeSubmit = async () => {
    const employeeCollectionRef = collection(db, "employee");
    try {
      const docRef = await addDoc(employeeCollectionRef, {
        name: newEmployeeName,
        phoneNumber: newEmployeePhone,
        email: newEmployeeEmailAddress,
        homeAddress: newEmployeeHomeAddress,
      });
      addEmployee({ 
        name: newEmployeeName, 
        phoneNumber: newEmployeePhone,
        email: newEmployeeEmailAddress,
        homeAddress: newEmployeeHomeAddress,
        id: docRef.id 
      });
      setNewEmployeeName("");
      setNewEmployeePhone(null);
      setNewEmployeeEmailAddress("");
      setNewEmployeeHomeAddress("");
      goBack();
    } catch (err){
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <h2>Create Employee Page</h2>
        <input
          placeholder="Name"
          value={newEmployeeName}
          onChange={(e) => setNewEmployeeName(e.target.value)}
        />
        <input
          placeholder="Phone Number"
          type="number"
          value={newEmployeePhone}
          onChange={(e) => setNewEmployeePhone(Number(e.target.value))}
        />
        <input
          placeholder="Email Address"
          value={newEmployeeEmailAddress}
          onChange={(e) => setNewEmployeeEmailAddress(e.target.value)}
        />
        <input
          placeholder="Home Address"
          value={newEmployeeHomeAddress}
          onChange={(e) => setNewEmployeeHomeAddress(e.target.value)}
        />
        <br></br>
        <button onClick={onEmployeeSubmit}> Submit Employee </button>
        <button onClick={goBack}>Go Back</button>
      </div>
    </div>
  );
}

export default CreateEmployee;