// import React, { useState } from 'react';
// import { updateDoc, doc } from 'firebase/firestore';
// import { db } from '../../config/firebase';

// function ReusableForm({ initialData, handleSubmit, buttonLabel }) {
//   const [formData, setFormData] = useState(initialData);

//  const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try{
//       const serviceDocRef = doc(db, 'service', formData.id);
//       await updateDoc(serviceDocRef, formData);
//       handleSubmit(formData);
//     } catch (error) {
//       console.error('Error updateg service: ', error);
//     }
//   };
  
//   return (

//     <form onSubmit={onSubmit}>
//       <input
//         type="text"
//         name="dateTime"
//         placeholder="Date and Time"
//         value={formData.dateTime}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="address"
//         placeholder="Address"
//         value={formData.address}
//         onChange={handleChange}
//       />
//       <div>
//         <br />
//         <label>
//           Deep Clean: 
//           <input
//             type="checkbox"
//             name="deepClean"
//             checked={formData.deepClean}
//             onChange={handleChange}
//           />
//         </label>
//       </div>
//       <br />
//       <button type="submit">{buttonLabel}</button>
//     </form>
//   )
// }

// export default ReusableForm;