import React, { useEffect, useState } from "react";

const defaultState = {
  name: "",
  status: "",
};
const Problem1 = () => {
  const [items, setItems] = useState([]);
  const [filterdItems, setFilteredtems] = useState([]);
  const [item, setItem] = useState({ ...defaultState });
  const [show, setShow] = useState("all");

  const onSubmit = (event) => {
    event.preventDefault();
    setItems((prev) => [...prev, item]);
    setFilteredtems((prev) => [...prev, item]);
    setItem({ ...defaultState });
  };

  const onChange = (event) => {
    setItem((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const sortData = (sortingCriteria) => {
    if (sortingCriteria === "all") {
      let filteredItems = items.sort((a, b) =>
        a.status.toLowerCase() > b.status.toLowerCase() ? 1 : -1
      );
      setFilteredtems(filteredItems);
    } else {
      let filteredItems = items.filter(
        (item) => item.status.toLowerCase() === sortingCriteria.toLowerCase()
      );
      setFilteredtems(filteredItems);
    }
  };

  const handleClick = (val) => {
    setShow(val);
  };

  useEffect(() => {
    sortData(show);
  }, [show, items]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form className="row gy-2 gx-3 align-items-center mb-4">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={onChange}
                placeholder="Name"
                value={item.name}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                name="status"
                onChange={onChange}
                value={item.status}
              />
            </div>
            <div className="col-auto">
              <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}>
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}>
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}>
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filterdItems.map((item, i) => (
                <tr key={i}>
                  <th>{item.name}</th>
                  <th>{item.status}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
