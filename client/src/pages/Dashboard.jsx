import React, { useContext, useEffect, useState } from "react";
import "../styles/dashboard.css";
import Popup from "../components/Popup";
import { getData } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { PiDogFill } from "react-icons/pi";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupAction, setPopupAction] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const response = await getData("user-data");
      if (response.status === 200) {
        const data = await response.data;
        setUsers(data.users);
      } else {
        toast.error("There was some system failure.");
        auth.setLoginStatus(false);
        navigate("/login");
      }
    };
    getUserData();
  });

  const handleLogout = async () => {
    const response = await getData("logout");
    if (response.status === 200) {
      auth.setLoginStatus(false);
      navigate("/login");
    } else {
      toast.error("There was some error logging out.");
    }
  };

  return (
    <>
      <div className="adminDashboard">
        <div className="adminDashboardHeader">
          <h2>Admin Dashboard</h2>
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
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
                <th>Warnings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <a
                      href={`https://wiggles.vercel.app/profile/${user._id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {user.name}
                    </a>
                  </td>
                  <td className="userTableCentreData">
                    {user.image ? (
                      <img
                        className="userImage"
                        src={user.image}
                        alt="profile"
                      />
                    ) : (
                      <PiDogFill className="userImage userStockImage" />
                    )}
                  </td>
                  <td>{user.breed}</td>
                  <td>{user.bio}</td>
                  <td>{user.violations?.warnings || "-"}</td>
                  <td className="userTableActions">
                    <button
                      type="button"
                      className="btn btn-warn"
                      onClick={() => {
                        setShowPopup(true);
                        setPopupAction("ban");
                        setUserID(user._id);
                      }}
                    >
                      Ban
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        setShowPopup(true);
                        setPopupAction("warn");
                        setUserID(user._id);
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
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupAction={popupAction}
          userID={userID}
          setUserID={setUserID}
        />
      )}
    </>
  );
};

export default Dashboard;
