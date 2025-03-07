import React, { useState } from 'react'
import LoginPage from './LoginPage';
import LoginPageOrganisation from './LoginPageOrganisation';

function Landing() {

  const [userType, setUserType] = useState("user");

  return (
    <div className="">
      <div className="">
        <select
          className=" w-32 mx-auto p-2 mb-4 border rounded-md focus:outline-none focus:ring-0"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="user">User</option>
          <option value="organisation">Organisation</option>
        </select>
      </div>
      {userType === "user" ? <LoginPage /> : <LoginPageOrganisation />}
    </div>
  )
}

export default Landing
