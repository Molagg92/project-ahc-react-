import React, { useState, useEffect } from "react";
import{ getDocs, collection, doc,  updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import CreateEmployee from "./CreateEmployee";
import EmployeeDetails from "./EmployeeDetails";

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
              // goToDelete={() => goToDelete(selectedEmployee)}
              goToUpdate={() => setCurrentOperation('employeeEdit')}
             />
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