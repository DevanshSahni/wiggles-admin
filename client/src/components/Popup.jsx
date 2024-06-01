import React, { useEffect, useState } from "react";
import "../styles/popup.css";
import { IoClose } from "react-icons/io5";

const Popup = ({ setShowPopup, popupText }) => {
  const [reason, setReason] = useState("name");
  const [message, setMessage] = useState("");

  document.body.style.overflowY = "hidden";

  useEffect(() => {
    setMessage(
      `Your account has been flagged for violating our community guidelines due to an issue with your ${reason}. Kindly update your ${reason} to comply with our guidelines, or we may have to ban your account.`
    );
  }, [reason]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend call to submit message, type and block user
  };

  return (
    <div className="popupWrapper">
      <form className="popupContainer" onSubmit={handleSubmit}>
        <span
          className="popupCloseBtn"
          onClick={() => {
            document.body.style.overflowY = "auto";
            setShowPopup(false);
          }}
        >
          <IoClose />
        </span>
        <h2>
          Are you sure you want to{" "}
          <span className="popupAction">{popupText}</span> the user?
        </h2>
        <div className="popupEntry">
          <h5>Select the reason: </h5>
          <select required onChange={(e) => setReason(e.target.value)}>
            <option value="name">Name</option>
            <option value="bio">Bio</option>
            <option value="image">Image</option>
            <option value="breed">Breed</option>
          </select>
        </div>
        <div className="popupEntry">
          <h5>Set the custom message: </h5>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button className="btn popupBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Popup;
