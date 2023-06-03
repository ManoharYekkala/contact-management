import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

const AllContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:7000/api/mycontacts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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

  return (
    <>
      <div className="all-contact-container">
        <h2>Your Contacts</h2>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Contacts..." />
        ) : (
          <table className="table table-hover">
            <thead>
              <tr className="table-primary">
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Email</th>
                <th scope="col">Phone No.</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <th scope="row">{contact.name}</th>
                  <td>{contact.address}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AllContact;
