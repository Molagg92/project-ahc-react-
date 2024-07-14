import React, { useState, useEffect } from "react";
import { doc, getDocs, collection, addDoc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import useEmployeeServices from '../../hooks/useEmployeeServices';

function EmployeeDetails({ employeeId, goBack, goToDelete, goToUpdate }) {
  const[employeeDetails, setEmployeeDetails] = useState(null);
  const[loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const { services: clientServices, removeServiceAssignment, refreshServices } = useEmployeeServices(employeeId);

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

  const fetchServices = async () => {
    try {
      const data = await getDocs(collection(db, 'service'));
      const specificData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setServices(specificData);
    } catch (err) {
      console.error(err);
    }
  };

  const joinEmployeeInService = async (employeeId, serviceId) => {
    try {
      const joinTableCollectionRef = collection(db, "joinEmployeeService");
      await addDoc(joinTableCollectionRef, {
        employeeId: String(employeeId),
        serviceId: String(serviceId),
      });
      alert("Employee Enrolled in Service!");
      refreshServices();
    } catch (err) {
      console.error("Error enrolling Employee: ", err);
    }
  };

  const handleJoin = async () => {
    if (selectedService) {
      await joinEmployeeInService(employeeId, selectedService);
    } else {
      alert("Please Select a Service.");
    }
  };

  useEffect(() => {
    getEmployeeDetails(employeeId);
    fetchServices();
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

      <h3>Assign Service</h3>
      <select onChange={(e) => setSelectedService(e.target.value)}>
        <option value="">Select a service</option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.address} - {service.dateTime}
          </option>
        ))}
      </select>
      <button onClick={handleJoin}>Assign Service</button>

      <h3>Assigned Services</h3>
      <ul>
        {clientServices.map((service) => (
          <li key={service.id}>
            {service.address} - {service.dateTime}
            <button onClick={() => removeServiceAssignment(service.id)}>Unassign Service</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default EmployeeDetails;