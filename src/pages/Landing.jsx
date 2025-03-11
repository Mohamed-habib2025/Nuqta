// import React, { useState } from 'react'
// import LoginPage from './LoginPage';
// import LoginPageOrganisation from './LoginPageOrganisation';

// function Landing() {

//   const [userType, setUserType] = useState("user");

//   return (
//     <div className="bg-gradient-to-r from-gray-50 to-gray-200">
//       <div className="w-[85%] mx-auto flex justify-center">
//         <select
//           className=" mt-5 cursor-pointer rounded-md focus:outline-none focus:ring-0"
//           value={userType}
//           onChange={(e) => setUserType(e.target.value)}
//         >
//           <option value="user">User</option>
//           <option value="organisation">Organisation</option>
//         </select>
//       </div>
//       {userType === "user" ? <LoginPage /> : <LoginPageOrganisation />}
//     </div>
//   )
// }

// export default Landing
