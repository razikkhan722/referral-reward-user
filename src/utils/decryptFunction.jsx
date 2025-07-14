// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import bcrypt from 'bcryptjs';

// // // const DataProcessingComponent = () => {
// // //   const [data, setData] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);

// // //   const allowedFields = [
// // //     'fullname',
// // //     'email',
// // //     'password',
// // //     'mobileNum',
// // //     'altNum',
// // //     'address',
// // //     'role',
// // //     'joining',
// // //     'code'
// // //   ];

// // //   // Function to process dynamic specific fields in parallel
// // //   const processDynamicSpecificFieldsParallel = async (users) => {
// // //     const promises = users.map(async (user) => {
// // //       const userObj = { ...user }; // assuming user is a plain object
// // //       const availableKeys = Object.keys(userObj).filter((key) =>
// // //         allowedFields.includes(key)
// // //       );

// // //       const processedString = availableKeys
// // //         .map((key) => userObj[key] || '')
// // //         .filter((value) => value !== '')
// // //         .map((value) => `$${value}`)
// // //         .map((value) => `#${value}`)
// // //         .map((value) => value.trim())
// // //         .reverse()
// // //         .join(' ');

// // //       console.log('processedString:', processedString);

// // //       // Hash with bcrypt
// // //       const saltRounds = 15;
// // //       const hashedString = bcrypt.hashSync(processedString, saltRounds);
// // //       console.log('hashedString:', hashedString);

// // //       const reversedHash = hashedString.split('').reverse().join('');
// // //       console.log('reversedHash:', reversedHash);

// // //       const numParts = allowedFields.length;
// // //       const hashLength = reversedHash.length;
// // //       const partSize = Math.ceil(hashLength / numParts);

// // //       const result = {};
// // //       for (let i = 0; i < numParts; i++) {
// // //         result[`R${i + 1}`] = reversedHash.slice(i * partSize, (i + 1) * partSize);
// // //       }

// // //       return result;
// // //     });

// // //     return await Promise.all(promises);
// // //   };

// // //   const fetchData = async () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     try {
// // //       // Replace with your API endpoint
// // //       const response = await axios.get('/api/users');
// // //       const users = response.data;

// // //       const processedFields = await processDynamicSpecificFieldsParallel(users);
// // //       setData(processedFields);
// // //     } catch (err) {
// // //       setError(err.message || 'Error fetching data');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, []);

// // //   if (loading) return <div>Loading...</div>;
// // //   if (error) return <div>Error: {error}</div>;

// // //   return (
// // //     <div>
// // //       <h1>Processed User Data</h1>
// // //       {data &&
// // //         data.map((item, index) => (
// // //           <div key={index}>
// // //             <h3>User {index + 1}</h3>
// // //             {Object.entries(item).map(([key, value]) => (
// // //               <p key={key}>
// // //                 {key}: {value}
// // //               </p>
// // //             ))}
// // //           </div>
// // //         ))}
// // //     </div>
// // //   );
// // // };

// // // export default DataProcessingComponent;
// // import React, { useState, useEffect } from 'react';
// // import bcrypt from 'bcryptjs';

// // const UserDataProcessor = () => {
// //   const [processedData, setProcessedData] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const allowedFields = [
// //    age,
// // arn_id,
// // date,
// // gender,
// //   ];

// //   // Mock user data (replace with your actual data fetch)
// //   const users = [
// //     {
// //       age: 'pAwV.P3KkRddDlL',
// //       arn_id: '4SR.ZSZX$21$b2$',
// //       date: 'OeS/5feBzVkd829',
// //       gender: '3OGGrGyuLM5MiaI',
// //     },
// //     // Add more user objects as needed
// //   ];

// //   const processUser = async (user) => {
// //     // Convert user to object
// //     const userObj = user;

// //     // Filter keys
// //     const availableKeys = Object.keys(userObj).filter((key) =>
// //       allowedFields.includes(key),
// //     );

// //     // Create the processed string
// //     const processedString = availableKeys
// //       .map((key) => userObj[key] || '')
// //       .filter((value) => value !== '')
// //       .map((value) => `$${value}`)
// //       .map((value) => `#${value}`)
// //       .map((value) => value.trim())
// //       .reverse()
// //       .join(' ');

// //     console.log('processedString:', processedString);

// //     // Hash the string
// //     const saltRounds = 15;
// //     const hashedString = bcrypt.hashSync(processedString, saltRounds);
// //     console.log('hashedString:', hashedString);

// //     // Reverse the hash
// //     const reversedHash = hashedString.split('').reverse().join('');
// //     console.log('reversedHash:', reversedHash);

// //     // Divide into parts
// //     const numParts = allowedFields.length;
// //     const hashLength = reversedHash.length;
// //     const partSize = Math.ceil(hashLength / numParts);

// //     const result = {};
// //     for (let i = 0; i < numParts; i++) {
// //       result[`R${i + 1}`] = reversedHash.slice(
// //         i * partSize,
// //         (i + 1) * partSize,
// //       );
// //     }

// //     return result;
// //   };

// //   const handleProcessData = async () => {
// //     setLoading(true);
// //     try {
// //       const results = await Promise.all(users.map((user) => processUser(user)));
// //       setProcessedData(results);
// //     } catch (err) {
// //       setError('Error processing data');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     handleProcessData();
// //   }, []);

// //   if (loading) return <div>Loading...</div>;

// //   if (error) return <div>{error}</div>;

// //   console.log('processedData: ', processedData);
// //   return (
// //     <div>
// //       <h2>Processed User Data</h2>
// //       {processedData.map((data, index) => (
// //         <div key={index}>
// //           <h3>User {index + 1}</h3>
// //           {Object.entries(data).map(([key, value]) => (
// //             <p key={key}>
// //               {key}: {value}
// //             </p>
// //           ))}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default UserDataProcessor;

// import CryptoJS from "crypto-js";

// export const processDynamicSpecificFieldsParallel = async (users) => {
//   const allowedFields = [
//     "date",
//     "age",
//     "gender",
//     "arn_id",
//   ];
//   const processUser = (user) => {
//     // Step 1: Pick allowed fields from user
//     const availableKeys = Object.keys(user).filter((key) => allowedFields.includes(key));

//     // Step 2: Process values
//     const processedString = availableKeys
//       .map((key) => user[key] || "")
//       .filter((value) => value !== "")
//       .map((value) => `$${value}`)
//       .map((value) => `#${value}`)
//       .map((value) => value.trim())
//       .reverse()
//       .join(" ");

//     console.log("processedString:", processedString);

//     // Step 3: Hash the string
//     const hashed = CryptoJS.SHA256(processedString).toString();
//     console.log("hashed:", hashed);

//     // Step 4: Reverse hash string
//     const reversedHash = hashed.split("").reverse().join("");
//     console.log("reversedHash:", reversedHash);

//     // Step 5: Divide into dynamic parts like R1, R2, ...
//     const numParts = allowedFields.length;
//     const partSize = Math.ceil(reversedHash.length / numParts);

//     const result = {};
//     for (let i = 0; i < numParts; i++) {
//       result[`R${i + 1}`] = reversedHash.slice(i * partSize, (i + 1) * partSize);
//     }

//     return result;
//   };

//   // Map over all users
//   const processedResults = users.map((user) => processUser(user));
//   return processedResults;
// };

// dummy functions for decrypt

// export const DecryptFunction = (enyptData) => {
//   const combinedString =
//     enyptData?.date + enyptData?.age + enyptData?.gender + enyptData?.arn_id ;
//   const parts = combinedString.split('#$');
//   console.log('parts: ', parts);
//   const newObj = {};
//   parts.forEach((part, index) => {
//     newObj[`part${index + 1}`] = part;
//   });
//   return newObj;
// };

// export const DecryptFunction = async(enyptData) => {
//   const combinedString =
//     enyptData?.date + enyptData?.age + enyptData?.gender + enyptData?.arn_id;
//   const parts = await combinedString.split('#$');
//   const newObj = {};

//   parts.forEach((part, index) => {
//     const key = `part${index + 1}`;
//     const trimmedPart =  part.trim();

//     // Check if part looks like an array
//     if (trimmedPart.startsWith('[') && trimmedPart.endsWith(']')) {
//       // Replace single quotes with double quotes to make it valid JSON
//       const jsonString = trimmedPart.replace(/'/g, '"');
//       try {
//         newObj[key] = JSON.parse(jsonString);
//       } catch (e) {
//         // fallback if JSON.parse fails
//         newObj[key] = trimmedPart;
//       }
//     } else {
//       newObj[key] = trimmedPart;
//     }
//   });

//   return newObj;
// };
export const DecryptFunction = async (encodedParts) => {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#*%!$';
  const shift = 5;

  // Step 1: Combine parts back into the full encoded string
  const fullEncodedString =
    encodedParts.date +
    encodedParts.age +
    encodedParts.gender +
    encodedParts.arn_id;

  // Step 2: Reverse the full encoded string
  const reversedOnce = await fullEncodedString.split('').reverse().join('');

  // Step 3: Shift characters back by -5
  let unshifted = '';
  for (let ch of reversedOnce) {
    const idx = charset.indexOf(ch);
    if (idx !== -1) {
      const newIndex = (idx - shift + charset.length) % charset.length;
      unshifted += charset[newIndex];
    } else {
      unshifted += ch;
    }
  }

  // Step 4: Reverse the string again
  const originalReversed = unshifted.split('').reverse().join('');

  // Step 5: Split by '#$' and remove empty strings
  const fields = originalReversed.split('#$').filter(Boolean);

  const newObj = {};

  fields.forEach((part, index) => {
    const key = `part${index + 1}`;
    const trimmedPart = part.trim();

    // Check if part looks like an array
    if (trimmedPart.startsWith('[') && trimmedPart.endsWith(']')) {
      // Replace single quotes with double quotes to make it valid JSON
      const jsonString = trimmedPart.replace(/'/g, '"');
      try {
        newObj[key] = JSON.parse(jsonString);
      } catch (e) {
        // fallback if JSON.parse fails
        newObj[key] = trimmedPart;
      }
    }

//     if (trimmedPart.startsWith('[') && trimmedPart.endsWith(']')) {
//   // Replace all single quotes with double quotes
//   let jsonString = trimmedPart.replace(/'/g, '"');
//   console.log('jsonString: ', jsonString);

//   // Handle datetime objects if present
//   jsonString = jsonString.replace(/datetime\.datetime\([^)]*\)/g, '"<datetime>"');

//   try {
//     newObj[key] = JSON.parse(jsonString);
//   } catch (e) {
//     // fallback if JSON.parse fails
//     newObj[key] = trimmedPart;
//   }
// }
    
    else {
      newObj[key] = trimmedPart;
    }
  });

  return newObj;
};
