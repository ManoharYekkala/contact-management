import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import ContextToast from "../context/ContextToast";
import contactaddpic from "../contactadd.svg";
import { useNavigate, useParams } from "react-router";
import { Spinner } from "react-bootstrap";

const EditContact = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const [contactData, setContactData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const { toast } = useContext(ContextToast);
  const [loading, setLoading] = useState(false);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://contact-api.up.railway.app/api/contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...contactData }),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Contact: ${contactData.name} Successfully Updated`);
      setContactData({
        name: "",
        address: "",
        email: "",
        phone: "",
      });
      nav("/", { replace: true });
    } else {
      toast.error(result.error);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://contact-api.up.railway.app/api/contact/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await res.json();
        console.log(result);
        setContactData({
          name: result.name,
          email: result.email,
          address: result.address,
          phone: result.phone,
        });
        setLoading(false);
      } catch (error) {
        // Handle error here
      }
    })();
  }, []);

  return (
    <div>
      <div className="card shadow p-4 rounded">
        {loading ? (
          <Spinner splash="Loading.." />
        ) : (
          <>
            <h2>Edit Contact</h2>
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
                value="Update Contact"
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditContact;
