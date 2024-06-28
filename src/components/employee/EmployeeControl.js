import React, { useState, useEffect } from "react";
import{ getDocs, collection, doc,  updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import CreateEmployee from "./CreateEmployee";
import EmployeeDetails from "./EmployeeDetails";
import DeleteEmployee from "./DeleteEmployee";
import EditEmployee from "./EditEmployee";

function EmployeeControl({ navigateHome  }) {
  const [currentOperation, setCurrentOperation] = useState('employeeControl');
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employeeCollectionRef = collection(db, 'employee');

  const getEmployeeList = async () => {
    try {
      const data = await getDocs(employeeCollectionRef);
      const specificData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEmployeeList(specificData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  const addEmployee = (newEmployee) => {
    setEmployeeList((prevList) => [...prevList, newEmployee]);
  };

  const removeEmployee = (employeeId) => {
    setEmployeeList((prevList) => prevList.filter(employee => employee.id !== employeeId));
  };

  const goToDelete = (employee) => {
    setSelectedEmployee(employee);
    setCurrentOperation('employeeDelete');
  };

  const updateEmployee = async (employeeId, updatedEmployeeData) => {
    try {
      const employeeDocRef = doc(db,'employee', employeeId );
      await updateDoc(employeeDocRef, updatedEmployeeData);
      getEmployeeList();
      setCurrentOperation('employeeDetails');
    } catch (err) {
      console.error('Error updateding employee: ', err);
    }
  };

  const goToUpdate = (employee) => {
    setSelectedEmployee(employee);
    setCurrentOperation('employeeEdit');
  };

  const renderOperationPage = () => {
    if (currentOperation === 'employeeCreate') {
      return <CreateEmployee
              goBack={() => setCurrentOperation('employeeControl')}
              addEmployee={addEmployee}
             />
    }
    if (currentOperation === 'employeeDetails') {
      return <EmployeeDetails 
              employeeId={selectedEmployee.id} 
              goBack={() => setCurrentOperation('employeeControl')} 
              goToDelete={() => goToDelete(selectedEmployee)}
              goToUpdate={() => setCurrentOperation('employeeEdit')}
             />
    }
    if (currentOperation === 'employeeDelete') {
      return (
        <DeleteEmployee
          employeeId={selectedEmployee.id}
          employeeName={selectedEmployee.name}
          goBack={() => setCurrentOperation('employeeControl')}
          removeEmployee={removeEmployee}
        />
      );
    }
    if (currentOperation === 'employeeEdit') {
      return (
        <EditEmployee
        employeeData={selectedEmployee}
        goBack={() => setCurrentOperation('employeeDetails')}
        updateEmployee={updateEmployee}
      />
      );
    }

  return (
    <div>
      <h2> employee Control Page</h2>
      <button onClick={() => setCurrentOperation('employeeCreate')}>Create Employee</button>
      <button onClick={navigateHome}>Go Back to Home</button>
      {employeeList.map((employee) => (
        <div key={employee.id}>
        <b>{employee.name}</b>
        <p>{employee.phoneNumber}</p>
        <button onClick={() => { setSelectedEmployee(employee); setCurrentOperation('employeeDetails'); }}>Details</button>
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

export default EmployeeControl;