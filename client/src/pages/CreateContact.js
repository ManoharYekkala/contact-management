import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import ContextToast from "../context/ContextToast";
import { HOST } from "../constants";

const CreateContact = () => {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const [contactData, setContactData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const { toast } = useContext(ContextToast);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${HOST}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(contactData),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(
        `Contact: ${contactData.name} Successfully Added , click Reload Contact to refresh`
      );
      setContactData({
        name: "",
        address: "",
        email: "",
        phone: "",
      });
      // nav("/mycontacts", { replace: true });
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div>
      <div className="card shadow p-4 rounded">
        <h2>Add a Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nameInput" className="form-label mt-4">
              Contact Name
            </label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              name="name"
              value={contactData.name}
              onChange={onInputChange}
              placeholder="Enter Contact Name...."
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="addressInput" className="form-label mt-4">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="addressInput"
              name="address"
              value={contactData.address}
              onChange={onInputChange}
              placeholder="Enter Address...."
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailInput" className="form-label mt-4">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              name="email"
              value={contactData.email}
              onChange={onInputChange}
              placeholder="Enter Email...."
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneInput" className="form-label mt-4">
              Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              id="phoneInput"
              name="phone"
              value={contactData.phone}
              onChange={onInputChange}
              placeholder="Enter Phone Number...."
              required
            />
          </div>
          <input
            type="submit"
            className="btn btn-outline-info my-4"
            value="Add Contact"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
