import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaRegHandshake, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import GPUCard from "../components/GPUCard";
import { AuthContext } from "../context/AuthContext";
import EditGPU from "../pages/EditGPU";
import { fetchGPUs } from "../services/listingService";
import { closeAuction, deleteGPU, addGPU } from "../services/api";

const GPUList = () => {
  const [gpus, setGpus] = useState([]); // State to store the list of GPUs
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle any errors
  const navigate = useNavigate(); // Hook for navigation

  const [user, setUser] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please login.");
      setLoading(false);
      return;
    }

    const getGPUs = async () => {
      try {
        const data = await fetchGPUs(token); // Fetch GPUs using the service
        setUser(data.userId);
        setGpus(data.gpus); // Set the received GPUs
        setLoading(false);
      } catch (err) {
        setError("Failed to load GPUs");
        setLoading(false);
      }
    };

    getGPUs(); // Call the function to fetch GPUs
  }, []);

  const placeBid = (gpu) => {
    // Pass the selected GPU details to the PlaceBid page using state
    navigate("/placebid", { state: { gpu } });
  };

  const handleCloseAuction = async (gpuId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    try {
      // Call the service function to close the auction
      await closeAuction(gpuId, token);

      // Update local state to reflect the change
      setGpus((prevGpus) =>
        prevGpus.map((gpu) =>
          gpu._id === gpuId ? { ...gpu, status: "closed" } : gpu
        )
      );
    } catch (err) {
      setError("Failed to close auction");
      console.error(err);
    }
  };

  const handleDeleteGPU = async (gpuId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    try {
      // Call the service function to delete the GPU
      const data = await deleteGPU(gpuId, token);

      // Remove GPU from state
      setGpus((prevGpus) => prevGpus.filter((item) => item._id !== gpuId));
    } catch (err) {
      setError(err.message || "Failed to delete GPU");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white">
        <h2 className="text-2xl">Loading GPUs...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white">
        <h2 className="text-2xl">{error}</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-black via-gray-800 to-gray-900 p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 border border-gray-700">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6 tracking-wide">
          GPU Marketplace
        </h1>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Available GPUs
          </h2>
          <Link
            to="/addgpu"
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-200 ease-in-out"
          >
            Add GPU
          </Link>
        </div>

        {gpus.length === 0 ? (
          <p className="text-gray-500 text-center">No GPUs available.</p>
        ) : (
          <div className="space-y-6">
            {gpus.map((gpu) => (
              <GPUCard
                key={gpu._id}
                gpu={gpu}
                user={user}
                placeBid={placeBid}
                handleDeleteGPU={handleDeleteGPU}
                closeAuction={handleCloseAuction}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GPUList;
