import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaRegHandshake, FaLock } from "react-icons/fa";
import { fetchDashboardData, deleteGPU } from "../services/api";

const Dashboard = () => {
  const [listedGPUs, setListedGPUs] = useState([]);
  const [boughtGPUs, setBoughtGPUs] = useState([]);
  const [bids, setBids] = useState([]);
  const [gpus, setGpus] = useState([]);
  const [user, setUser] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("No token found. Please login.");
        return;
      }

      try {
        const data = await fetchDashboardData(token);
        setListedGPUs(data.listedGPUs);
        setUser(data.userId);
        setBoughtGPUs(data.boughtGPUs);
        setBids(data.bids);
        console.log(data.bids);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, []);

  const handleDeleteGPU = async (gpuId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("No token found. Please login.");
      return;
    }

    try {
      const success = await deleteGPU(gpuId, token);
      if (success) {
        setListedGPUs(listedGPUs.filter((item) => item._id !== gpuId)); // Remove deleted GPU from state
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6">Dashboard</h1>

      {/* Listed GPUs */}
      <section className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Listed GPUs
        </h2>
        {listedGPUs.length > 0 ? (
          <ul className="space-y-3">
            {listedGPUs.map((gpu) => (
              <li
                key={gpu._id}
                className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition duration-200 ease-in-out"
              >
                <span className="text-gray-700">{gpu.name}</span>
                {gpu.status === "closed" ? (
                  <span className="text-red-900 font-semibold">
                    <span className="flex items-center gap-2 bg-gradient-to-r from-red-900 to-pink-900 text-white px-5 py-2 rounded-full hover:from-red-600 hover:to-pink-600 shadow-md transition-all duration-200 ease-in-out">
                      Auction Completed
                    </span>
                  </span>
                ) : (
                  <span className="text-red-700 font-semibold">
                    <span className="flex items-center gap-2 bg-gradient-to-r from-red-700 to-pink-700 text-white px-5 py-2 rounded-full hover:from-red-600 hover:to-pink-600 shadow-md transition-all duration-200 ease-in-out">
                      Auction is Live
                    </span>
                  </span>
                )}

                {gpu.owner === user && (
                  <button
                    className={`flex items-center gap-2 px-5 py-2 rounded-full shadow-md transition-all duration-200 ease-in-out 
                   bg-gray-400 text-white cursor-not-allowed`}
                  >
                    <Link
                      to={`/placebid`}
                      state={{ gpu }}
                      className="flex items-center gap-2"
                    >
                      <FaRegHandshake />

                      <span>View Bid</span>
                    </Link>
                  </button>
                )}
                {gpu.owner === user && (
                  <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-5 py-2 rounded-full hover:from-blue-600 hover:to-teal-600 shadow-md transition-all duration-200 ease-in-out">
                    <FaEdit />{" "}
                    <Link to={`/editgpu`} state={{ gpuId: gpu._id }}>
                      Edit{" "}
                    </Link>
                  </button>
                )}
                {gpu.owner === user && (
                  <button
                    onClick={() => handleDeleteGPU(gpu._id)}
                    // onClick={() => {
                    //   setGpus(gpus.filter((item) => item._id !== gpu._id)); // Frontend deletion logic
                    // }}
                    className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-full hover:from-red-600 hover:to-pink-600 shadow-md transition-all duration-200 ease-in-out"
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No GPUs listed.</p>
        )}
      </section>

      {/* Bought GPUs */}
      <section className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Bought GPUs
        </h2>
        {boughtGPUs.length > 0 ? (
          <ul className="space-y-3">
            {boughtGPUs.map((gpu) => (
              <li
                key={gpu._id}
                className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition duration-200 ease-in-out"
              >
                <span className="text-gray-700">{gpu.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No GPUs bought yet.</p>
        )}
      </section>

      {/* Bids */}
      <section className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bids</h2>
        {bids.length > 0 ? (
          <ul className="space-y-3">
            {bids.map((bid) => (
              <li
                key={bid._id}
                className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition duration-200 ease-in-out"
              >
                <span className="text-gray-700">
                  ${bid.amount} on{" "}
                  {bid.gpu ? <span> {bid.gpu.name} </span> : null}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No bids placed yet.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
