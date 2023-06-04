import { useState, useEffect, useContext } from "react";
import Spinner from "../components/Spinner";
import { Modal } from "react-bootstrap";
import ContextToast from "../context/ContextToast";
import { Link } from "react-router-dom";
import "./Table.css";

const AllContact = () => {
  const { toast } = useContext(ContextToast);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://contact-api-s2j7.onrender.com/api/mycontacts`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await res.json();
        if (!result.error) {
          setContacts(result.contacts);
          setLoading(false);
        } else {
          console.log(result.error);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const deleteContact = async (id) => {
    if (window.confirm("Confirm Deletion? Contact will be lost forever.")) {
      try {
        const res = await fetch(
          `https://contact-api-s2j7.onrender.com/api/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await res.json();
        if (!result.error) {
          setContacts(result.myContacts);
          toast.success("Deleted contact");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();

    const searchResults = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setContacts(searchResults);
  };

  return (
    <>
      <div className="all-contact-container">
        <hr className="my-2" />
        {loading ? (
          <Spinner splash="Loading Contacts..." />
        ) : (
          <>
            {contacts.length === 0 ? (
              <h3>No Contacts</h3>
            ) : (
              <>
                <form className="d-flex" onSubmit={handleSearch}>
                  <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    className="form-control my-2"
                    placeholder="Search contacts..."
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                    }}
                  ></input>
                  <button
                    type="submit"
                    className="btn btn-sm btn-info"
                    style={{ height: "40px", marginTop: "7px" }}
                  >
                    Search
                  </button>
                </form>
                <p>
                  Total Contacts : <strong>{contacts.length}</strong>
                  <span>
                    <a href="/" className="btn btn-outline-warning btn-sm mx-3">
                      Reload Contact
                    </a>
                  </span>
                </p>
                <div className="table-container">
                  <table className="table table-hover">
                    <thead className="sticky-top">
                      <tr className="table-primary">
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone No.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr
                          key={contact._id}
                          onClick={() => {
                            setModalData({});
                            setModalData(contact);
                            setShowModal(true);
                          }}
                        >
                          <th scope="row">{contact.name}</th>
                          <td>{contact.address}</td>
                          <td>{contact.email}</td>
                          <td>{contact.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.name}</h3>
          <p>
            <strong>Address</strong>: {modalData.address}
          </p>
          <p>
            <strong>Email</strong>: {modalData.email}
          </p>
          <p>
            <strong>Phone Number</strong>: {modalData.phone}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/edit/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => deleteContact(modalData._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllContact;
