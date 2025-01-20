// services/api.js
import axios from "axios";

export const closeAuction = async (gpuId, token) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  try {
    // Send request to update the GPU's status to 'closed'
    await axios.patch(
      `${backendUrl}/api/updateGPUStatus/${gpuId}`,
      { status: "closed" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    throw new Error("Failed to close auction");
  }
};

export const addGPU = async (formData, token) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const ownerId = token; // Assuming token is the ownerId

  const requestData = {
    ...formData,
    ownerId, // Add ownerId to the request data
  };

  try {
    const response = await fetch(`${backendUrl}/api/addgpu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      throw new Error(data.message || "Failed to add GPU listing.");
    }
  } catch (error) {
    throw new Error(error.message || "Error adding GPU. Please try again.");
  }
};

export const deleteGPU = async (gpuId, token) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  try {
    const response = await fetch(`${backendUrl}/api/delete/${gpuId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Ensure user authentication
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to delete GPU");
    }

    return data; // Return the response data if successful
  } catch (error) {
    throw new Error(error.message || "Error deleting GPU");
  }
};

export const fetchDashboardData = async (token) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  try {
    const response = await fetch(`${backendUrl}/api/getDashboardData`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data; // Return dashboard data
    } else {
      throw new Error(data.message || "Failed to fetch dashboard data.");
    }
  } catch (error) {
    throw new Error(error.message || "Error fetching dashboard data.");
  }
};

//   export const deleteGPU = async (gpuId, token) => {
//     const backendUrl = process.env.REACT_APP_BACKEND_URL;

//     try {
//       const response = await fetch(`${backendUrl}/api/delete/${gpuId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await response.json();

//       if (response.ok) {
//         return true; // Successfully deleted
//       } else {
//         throw new Error(data.message || "Error deleting GPU.");
//       }
//     } catch (error) {
//       throw new Error(error.message || "Error deleting GPU.");
//     }
//   };

export const fetchGPUById = async (gpuId, token) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  try {
    const response = await axios.get(
      `${backendUrl}/api/fetchGPUById/${gpuId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.gpu; // Return the fetched GPU data
  } catch (error) {
    throw new Error("Error fetching GPU details. Please try again.");
  }
};

export const updateGPU = async (gpuId, updatedGPU, token) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  try {
    const response = await axios.put(
      `${backendUrl}/api/updateGPU/${gpuId}`,
      updatedGPU,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response; // Return the response object to check status
  } catch (error) {
    throw new Error("Error updating GPU. Please try again.");
  }
};
