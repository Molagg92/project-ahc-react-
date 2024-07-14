import { useState, useEffect } from "react";
import { db } from '../config/firebase';
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";

const useEmployeeServices = (employeeId) => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const joinCollectionRef = collection(db, 'joinEmployeeService');
      const servicesCollectionRef = collection(db, 'service');

      const enrollmentQuery = query(joinCollectionRef, where('employeeId', '==', employeeId));
      const enrollmentSnapshot = await getDocs(enrollmentQuery);
      const enrollmentDocs = enrollmentSnapshot.docs.map(doc => doc.data());
      const serviceIds = enrollmentDocs.map(enrollment => enrollment.serviceId);

      if (serviceIds.length === 0) {
        setServices([]);
        return;
      }
      const servicesQuery = query(servicesCollectionRef, where('__name__', 'in', serviceIds));
      const servicesSnapshot = await getDocs(servicesQuery);
      const serviceData = servicesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setServices(serviceData);
    } catch (err) {
      console.error("Error fetching Employee Services: ", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [employeeId]);

  const removeServiceAssignment = async (serviceId) => {
    try {
      const joinCollectionRef = collection(db, 'joinEmployeeService');
      const enrollmentQuery = query(joinCollectionRef, where('employeeId', '==', employeeId), where('serviceId', '==', serviceId));
      const enrollmentSnapshot = await getDocs(enrollmentQuery);

      if (!enrollmentSnapshot.empty) {
        const docId = enrollmentSnapshot.docs[0].id;
        await deleteDoc(doc(db, 'joinEmployeeService', docId));
        fetchServices();  // Refresh services after removal
      }
    } catch (err) {
      console.error("Error removing service assignment: ", err);
    }
  };

  return {
    services,
    removeServiceAssignment,
    refreshServices: fetchServices
  };
};

export default useEmployeeServices;