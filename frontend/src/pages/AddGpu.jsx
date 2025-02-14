import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { addGPU } from "../services/api";

const AddGpu = () => {
  const [form, setForm] = useState({
    name: "",
    model: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false); // To show loading state
  const [errorMessage, setErrorMessage] = useState(""); // To handle error messages
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Ensure token is retrieved properly

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset error message before making the request

    try {
      const data = await addGPU(form, token);

      if (data.success) {
        alert(data.message); // Show success message
        setForm({
          name: "",
          model: "",
          price: "",
          description: "",
        });
        navigate("/gpulistings"); // Redirect user to homepage or another page if needed
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message || "Error adding GPU. Please try again.");
      console.error("Error adding GPU:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-800 to-gray-900 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 border border-gray-700 hover:scale-105 transition-all duration-300 ease-in-out">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6 tracking-wide">
          Add New GPU Listing
        </h1>

        {loading && <p className="text-center">Submitting your GPU...</p>}
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
              value={form.name}
              onChange={handleChange}
              required
            />
            <InputField
              type="text"
              name="model"
              placeholder="Model"
              value={form.model}
              onChange={handleChange}
              required
            />
            <InputField
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
            />
            <InputField
              type="textarea"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Add GPU Listing
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddGpu;
