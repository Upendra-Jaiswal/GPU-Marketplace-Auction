import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaRegHandshake, FaLock } from "react-icons/fa";
import { fetchDashboardData, deleteGPU, closeAuction } from "../services/api";

const Dashboard = () => {
  const [listedGPUs, setListedGPUs] = useState([]);
  const [boughtGPUs, setBoughtGPUs] = useState([]);
  const [bids, setBids] = useState([]);
  const [user, setUser] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
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
        setListedGPUs(listedGPUs.filter((item) => item._id !== gpuId));
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-6 text-center">
        Dashboard
      </h1>

      {/* Listed GPUs */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Listed GPUs
        </h2>
        {listedGPUs.length > 0 ? (
          <ul className="space-y-3">
            {listedGPUs.map((gpu) => (
              <li
                key={gpu._id}
                className="flex flex-wrap justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <span className="text-gray-700">{gpu.name}</span>

                {gpu.owner === user && (
                  <div className="flex flex-wrap gap-2 sm:gap-4 mt-3 sm:mt-0">
                    <button
                      className={`flex items-center gap-2 px-4 py-2 rounded-md shadow-md w-full sm:w-auto ${
                        gpu.status !== "closed"
                          ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                      onClick={() =>
                        gpu.status !== "closed" && closeAuction(gpu._id)
                      }
                      disabled={gpu.status === "closed"}
                    >
                      <FaLock />{" "}
                      {gpu.status !== "closed"
                        ? "Close Auction"
                        : "Auction Closed"}
                    </button>

                    <button
                      onClick={() => handleDeleteGPU(gpu._id)}
                      className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-md w-full sm:w-auto hover:from-red-600 hover:to-pink-600 shadow-md transition duration-200"
                    >
                      <FaTrash />
                      Delete
                    </button>

                    <button
                      onClick={() => navigate("/placebid", { state: { gpu } })}
                      className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md w-full sm:w-auto shadow-md"
                    >
                      <FaRegHandshake />
                      View Bid
                    </button>

                    {gpu.status !== "closed" && (
                      <button
                        onClick={() =>
                          navigate("/editgpu", { state: { gpuId: gpu._id } })
                        }
                        className="flex items-center gap-2 bg-gradient-to-r w-full sm:w-auto from-blue-500 to-teal-500 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-teal-600 shadow-md transition duration-200"
                      >
                        <FaEdit /> Edit
                      </button>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No GPUs listed.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
