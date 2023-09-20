import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

const AllContactsModal = ({ children }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();

  const [allCountacts, setAllCountacts] = useState([]);
  const [next, setNext] = useState("");
  const [even, setEven] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAllContacts = async () => {
    let {
      data: { next, results },
    } = await axios.get(`https://contact.mediusware.com/api/contacts/`);
    setNext(next);
    setAllCountacts([...results]);
  };
  useEffect(() => {
    if (even) {
      let evenData = allCountacts.filter((c) => c.id % 2 == 0);
      setAllCountacts(evenData);
    } else {
      getAllContacts();
    }
  }, [even]);

  const onChangeEven = () => {
    setEven(!even);
  };

  return (
    <>
      <button onClick={handleShow}>{children}</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>All Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <button
              className="btn btn-lg"
              style={{ color: "#46439f" }}
              type="button">
              All Contacts
            </button>
            <button
              style={{ color: "#ff7f50" }}
              className="btn btn-lg"
              type="button">
              US Contacts
            </button>
            <button
              onClick={handleClose}
              style={{ color: "#46439f" }}
              className="btn btn-lg"
              type="button">
              Close
            </button>
          </div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Mobile</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {allCountacts?.map((item, i) => (
                <tr key={i}>
                  <th>{item.id}</th>
                  <th>{item.phone}</th>
                  <th>{item.country?.name}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value={even}
              id="flexCheckChecked"
              onChange={onChangeEven}
            />
            <label class="form-check-label" for="flexCheckChecked">
              Even Only
            </label>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllContactsModal;
