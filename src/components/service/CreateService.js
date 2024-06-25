import React from "react";
import { useState } from "react";
import { db } from "../../config/firebase";
import{ collection, addDoc } from 'firebase/firestore';

function CreateService({ goBack, addService }) {
  const [newServiceAddress, setNewServiceAddress] = useState("");
  const [isServiceDeepClean, setIsServiceDeepClean] = useState(false);
  const [newServiceDateTime, setNewServiceDateTime] = useState("");
  
  const onServiceSubmit = async () => {
    const serviceCollectionRef = collection(db, "service");
    try{
      const docRef = await addDoc(serviceCollectionRef, {
        address: newServiceAddress,
        deepClean: isServiceDeepClean,
        dateTime: newServiceDateTime,
      });
      addService({
        address: newServiceAddress,
        deepClean: isServiceDeepClean,
        dateTime: newServiceDateTime,
        id: docRef.id
      });
      setNewServiceAddress("");
      setIsServiceDeepClean(false);
      setNewServiceDateTime("");
    } catch (err){
      console.error(err);
    }
  };

  return(
    <div>
    <div>
      <h2>Create Service Page</h2>
      <input
        placeholder="Address"
        value={newServiceAddress}
        onChange={(e) => setNewServiceAddress(e.target.value)}
      />
      <input
        placeholder="Date and Time"
        value={newServiceDateTime}
        onChange={(e) => setNewServiceDateTime(e.target.value)}
      />
      <div>
        <p>Deep Cleaning?</p> <input
                                  type="checkbox"
                                  checked={isServiceDeepClean}
                                  onChange={(e) => setIsServiceDeepClean(e.target.checked)}
                                />
      </div>  
      <br></br>
      <button onClick={onServiceSubmit}> Submit Service </button>
      <button onClick={goBack}>Go Back</button>
    </div>
  </div>

  )
};

export default CreateService;
