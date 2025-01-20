import axios from "axios";

export const fetchBids = async (gpuId, token) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  try {
    const response = await fetch(`${backendUrl}/api/fetchBids/${gpuId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data; // Return fetched bids data
    } else {
      throw new Error(data.message || "Error fetching bids.");
    }
  } catch (error) {
    throw new Error(error.message || "Error fetching bids.");
  }
};



export const placeBid = async (bidAmount, gpuId, token) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
    try {
      const response = await fetch(`${backendUrl}/api/placeBid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bidAmount, // Bid amount
          gpuId, // GPU ID
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data; // Return success message or any other data
      } else {
        throw new Error(data.message || "Failed to place bid.");
      }
    } catch (error) {
      throw new Error(error.message || "There was an error placing the bid.");
    }
  };



// export const placeBid = async (gpuId, bidAmount, token) => {
//   const backendUrl = process.env.REACT_APP_BACKEND_URL;

//   try {
//     const response = await fetch(`${backendUrl}/api/placeBid`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         bidAmount,
//         gpuId,
//       }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       return data; // Return success message or other data
//     } else {
//       throw new Error(data.message || "Error placing bid.");
//     }
//   } catch (error) {
//     throw new Error(error.message || "Error placing bid.");
//   }
// };
