import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchGPUById, updateGPU } from "../services/api";

const GPUEdit = () => {
  const [gpu, setGpu] = useState(null);
  const [updatedGPU, setUpdatedGPU] = useState({
    name: "",
    model: "",
    price: "",
    status: "available",
  });
  const [loading, setLoading] = useState(false); // To show loading state
  const [errorMessage, setErrorMessage] = useState(""); // To handle error messages
  const location = useLocation();
  const navigate = useNavigate();
  const { gpuId } = location.state; // Get the GPU ID passed from the previous component

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const fetchedGPU = await fetchGPUById(gpuId, token);
        setGpu(fetchedGPU);
        setUpdatedGPU({
          name: fetchedGPU.name,
          model: fetchedGPU.model,
          price: fetchedGPU.price,
          gpuId,
        });
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, [gpuId]);

  const handleChange = (e) => {
    setUpdatedGPU({ ...updatedGPU, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset error message before making the request

    try {
      const token = localStorage.getItem("token");
      const response = await updateGPU(gpu._id, updatedGPU, token);

      if (response.status === 200) {
        alert("GPU details updated successfully!");
        navigate("/gpulistings"); // Redirect after successful update
      } else {
        alert("Failed to update GPU details.");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  if (!gpu) {
    return <div>Loading...</div>; // Show loading until GPU is fetched
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-800 to-gray-900 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 border border-gray-700 hover:scale-105 transition-all duration-300 ease-in-out">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6 tracking-wide">
          Edit GPU Details
        </h1>

        {loading && <p className="text-center">Updating your GPU...</p>}
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
        >
          <div className="flex flex-col gap-4">
            <InputField
              type="text"
              name="name"
              placeholder="GPU Name"
              value={updatedGPU.name}
              onChange={handleChange}
              required
            />
            <InputField
              type="text"
              name="model"
              placeholder="Model"
              value={updatedGPU.model}
              onChange={handleChange}
              required
            />
            <InputField
              type="number"
              name="price"
              placeholder="Price"
              value={updatedGPU.price}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Update GPU Listing
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GPUEdit;
