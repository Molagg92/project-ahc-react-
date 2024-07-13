import { useState, useEffect } from "react";
import { db } from '../config/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

const useClientServices = (clientId) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const joinCollectionRef = collection(db, 'joinClientService');
        const servicesCollectionRef = collection(db, 'service');

        const enrollmentQuery = query(joinCollectionRef, where('clientId', '==', clientId));
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
        console.error("Error fetching Client Services: ", err);
      }
    };

    fetchServices();
  }, [clientId]);

  return services;
};

export default useClientServices;