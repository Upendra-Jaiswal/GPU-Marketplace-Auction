// services/listingService.js
import axios from "axios";

export const fetchGPUs = async (token) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  try {
    const response = await axios.get(`${backendUrl}/api/fetchAllGPUs`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach Bearer token
      },
    });

    return response.data; // Return the response data
  } catch (err) {
    throw new Error("Failed to load GPUs");
  }
};
