import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';

function ReusableForm({ initialData, handleSubmit, buttonLabel }) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const {name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      const employeeDocRef = doc(db, 'employee', formData.id);
      await updateDoc(employeeDocRef, formData);
      handleSubmit(formData);
    } catch (error) {
      console.error('Error updateg employee: ', error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="homeAddress"
        placeholder="Home Address"
        value={formData.homeAddress}
        onChange={handleChange}
      />
      <button type="submit">{buttonLabel}</button>

    </form>
  )
}

export default ReusableForm;