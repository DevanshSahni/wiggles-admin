import React, { useEffect, useState } from 'react'
import "../styles/dashboard.css"

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user-data`)
      const data = await response.json();
      setUsers(data.users);
    }
    getUserData();
  }, []);

  return (
    <div className='adminDashboard'>
      <h2>Admin Dashboard</h2>
      <br />
      <table className='userTable'>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.bio}</td>
              <td>
                <button type="button" className='btn btn-danger'>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard