import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Square = ({ data, onModalOpen }) => {
  let squareClassName = "square";
  let circleColorClass = "";
  switch (data.s) {
    case 10:
      squareClassName += " square_success";
      circleColorClass = "circle_success";
      break;
    case 20:
      squareClassName += " square_fine";
      circleColorClass = "circle_fine";
      break;
    case 30:
      squareClassName += " square_weak";
      circleColorClass = "circle_weak";
      break;
    case 40:
      squareClassName += " square_warning";
      circleColorClass = "circle_warning";
      break;
    case 50:
      squareClassName += " square_warning";
      circleColorClass = "circle_warning";
      break;
    case 60:
      squareClassName += " square_critical";
      circleColorClass = "circle_critical";
      break;
    default:
      break;
  }

  const handleClick = () => {
    onModalOpen(data, circleColorClass);
  };

  return (
    <div className={squareClassName} onClick={handleClick}>
      <p className="d-flex justify-content-center square_index">{data.port}</p>
    </div>
  );
};

const App = () => {
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [modalCircleColor, setModalCircleColor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.npoint.io/89d9dbda9f8509a5fd45"
        );
        setJsonData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleModalOpen = (squareData, circleColorClass) => {
    setModalData(squareData);
    setModalCircleColor(circleColorClass);
  };

  const handleCloseModal = () => {
    setModalData(null);
    setModalCircleColor(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const containers = [
    { id: 1, label: "Container 1" },
    { id: 2, label: "Container 2" },
    { id: 3, label: "Container 3" },
    { id: 4, label: "Container 4" },
    { id: 5, label: "Container 5" },
    { id: 6, label: "Container 6" },
    { id: 7, label: "Container 7" },
    { id: 8, label: "Container 8" },
    { id: 9, label: "Container 9" },
  ];

  return (
    <><div className="app">
      <h1 className="d-flex justify-content-center pad_title">
        {jsonData["19"] && jsonData["19"].name}
      </h1>
      <div className="square_container_wrapper">
        {containers.map((container) => (
          <div
            key={container.id}
            className={`square_container ${container.id <= 3 ? "custom_grid" : ""}`}
          >
            {jsonData["19"].values
              .filter((data) => data.pdu === container.id && data.port)
              .slice(0, container.id <= 3 ? 13 : undefined)
              .map((square, index) => (
                <Square
                  key={index}
                  data={square}
                  onModalOpen={handleModalOpen} />
              ))}
          </div>
        ))}
      </div>
    </div><div
      className="modal"
      tabIndex="-1"
      style={{ display: modalData ? "block" : "none" }}
    >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-center">
              <h5>Unit details</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <p className="d-flex">
                Status:{" "}
                <div
                  className={`circle ${modalCircleColor} ms-2 me-1 mt-1`}
                ></div>
                <div>
                  {modalCircleColor
                    ? modalCircleColor.split("_")[1].toUpperCase()
                    : ""}
                </div>
              </p>
              {modalData?.port && <p>Port: {modalData.port}</p>}
              {modalData?.TH5s && <p>TH5s: {modalData.TH5s}</p>}
              {modalData?.THAvg && <p>THAvg: {modalData.THAvg}</p>}
              {modalData?.freq && <p>Frequency: {modalData.freq}</p>}
              {modalData?.w && <p>W: {modalData.w}</p>}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div></>
  );
};

export default App;
