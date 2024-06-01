import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import Popup from "../components/Popup";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user-data`
      );
      const data = await response.json();
      setUsers(data.users);
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="adminDashboard">
        <h2>Admin Dashboard</h2>
        <br />
        <div className="userTableWrapper">
          <table className="userTable">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Image</th>
                <th>Breed</th>
                <th>Bio</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>
                    {user.image && (
                      <img
                        className="userImage"
                        src={user.image}
                        alt="profile"
                      />
                    )}
                  </td>
                  <td>{user.breed}</td>
                  <td>{user.bio}</td>
                  <td className="userTableActions">
                    <button
                      type="button"
                      className="btn btn-warn"
                      onClick={() => {
                        setShowPopup(true);
                        setPopupText("ban");
                      }}
                    >
                      Ban
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        setShowPopup(true);
                        setPopupText("warn");
                      }}
                    >
                      Warn
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showPopup && <Popup setShowPopup={setShowPopup} popupText={popupText} />}
    </>
  );
};

export default Dashboard;
