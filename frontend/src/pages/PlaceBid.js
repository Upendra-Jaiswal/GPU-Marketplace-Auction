// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { FaTrophy } from "react-icons/fa";
// import Button from "../components/Button";
// import InputField from "../components/InputField";
// import BidCard from "../components/BidCard";
// import { fetchBids, placeBid } from "../services/bidService";

// const GPUPage = () => {
//   const { state } = useLocation();
//   const { gpu } = state || {};

//   const [formData, setFormData] = useState("");
//   const [dashboardData, setDashboardData] = useState([]);
//   const [bids, setBids] = useState([]);
//   const [highestBid, setHighestBid] = useState(0);
//   const [status, setStatus] = useState("");

//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("token");

//   const fetchBidsData = async () => {
//     try {
//       const data = await fetchBids(gpu._id, token);
//       setBids(data);
//       setHighestBid(data[0]?.amount || 0);
//       setStatus(gpu.status === "closed");
//     } catch (error) {
//       console.error("Error fetching bids:", error);
//       setError("There was an error fetching the bid.");
//     }
//   };

//   useEffect(() => {
//     fetchBidsData();
//   }, []);

//   const handleInputChange = (e) => {
//     // Ensure input is a valid number, allow only digits (no strings)
//     const value = e.target.value;
//     if (/^\d*$/.test(value)) {
//       setFormData(value);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if entered value is less than GPU price
//     if (parseInt(formData, 10) < gpu.price || formData === "") {
//       alert(
//         "The entered value must be greater than or equal to the GPU price."
//       );
//       return; // Exit early without submitting the form
//     }

//     const num = parseInt(formData, 10);

//     if (num <= highestBid) {
//       alert("Bid must be higher than the current bid.");
//       return;
//     }

//     if (!isNaN(num)) {
//       // Add the number to the dashboardData array
//       setDashboardData((prevData) => {
//         const newData = [...prevData, num];
//         const sortedData = newData.sort((a, b) => b - a); // Sort numbers in descending order
//         return sortedData;
//       });

//       // Reset form after submission
//       setFormData("");

//       try {
//         const data = await placeBid(num, gpu._id, token);
//         fetchBidsData(); // Call function to refresh bids

//         alert(data.message); // Show success message
//       } catch (error) {
//         console.error("Error placing bid:", error);
//         setError("There was an error placing the bid.");
//       }
//     }
//   };

//   if (!gpu) {
//     return <div>Loading GPU details...</div>;
//   }

//   const isSubmitDisabled =
//     formData === "" || parseInt(formData, 10) < gpu.price;

//   return (
//     <div className="flex min-h-screen">
//       <div className="w-full md:w-1/3 p-8 bg-gray-100 rounded-lg shadow-md">
//         <h2 className="text-3xl font-semibold text-blue-600 mb-6">
//           GPU Details
//         </h2>
//         <div className="space-y-4">
//           <p className="text-lg font-medium">
//             <span className="font-bold">Name:</span> {gpu.name}
//           </p>
//           <div>
//             <p className="text-lg font-medium">
//               <span className="font-bold">Specifications:</span>
//             </p>
//             <ul className="ml-6 space-y-2 text-gray-600">
//               <li>
//                 <strong>Model:</strong> {gpu.model}
//               </li>
//               <li>
//                 <strong>Price:</strong> ${gpu.price}
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="w-2/3 p-8 bg-white flex flex-col">
//         <div className="mb-8 flex-grow">
//           <div className="mb-8 flex-grow">
//             <h3 className="text-2xl font-semibold text-blue-600">
//               Bidding Dashboard
//             </h3>

//             <div className="mt-4 space-y-2 h-[700px] overflow-y-auto  border-gray-300 p-2 rounded">
//               <BidCard
//                 bids={bids}
//                 highestBid={highestBid}
//                 status={gpu.status}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="mt-auto space-y-4">
//           <h4 className="text-xl font-medium text-blue-600">Place Bid Here</h4>
//           <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//             {error && <p className="text-red-600">{error}</p>}
//             <div className="flex items-center space-x-4">
//               <InputField
//                 type="number"
//                 name="formData"
//                 value={formData}
//                 onChange={handleInputChange}
//                 placeholder="Enter a number"
//                 disabled={gpu.status === "closed"}
//               />

//               <Button type="submit" disabled={isSubmitDisabled}>
//                 Place Bid
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GPUPage;
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";
import Button from "../components/Button";
import InputField from "../components/InputField";
import BidCard from "../components/BidCard";
import { fetchBids, placeBid } from "../services/bidService";

const GPUPage = () => {
  const { state } = useLocation();
  const { gpu } = state || {};

  const [formData, setFormData] = useState("");
  const [bids, setBids] = useState([]);
  const [highestBid, setHighestBid] = useState(0);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const fetchBidsData = async () => {
    try {
      const data = await fetchBids(gpu._id, token);
      setBids(data);
      setHighestBid(data[0]?.amount || 0);
    } catch (error) {
      console.error("Error fetching bids:", error);
      setError("There was an error fetching the bid.");
    }
  };

  useEffect(() => {
    fetchBidsData();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setFormData(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(formData, 10) < gpu.price || formData === "") {
      alert(
        "The entered value must be greater than or equal to the GPU price."
      );
      return;
    }

    const num = parseInt(formData, 10);
    if (num <= highestBid) {
      alert("Bid must be higher than the current bid.");
      return;
    }

    setFormData("");

    try {
      const data = await placeBid(num, gpu._id, token);
      fetchBidsData();
      alert(data.message);
    } catch (error) {
      console.error("Error placing bid:", error);
      setError("There was an error placing the bid.");
    }
  };

  if (!gpu) {
    return <div>Loading GPU details...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4 md:p-8">
      {/* GPU Details */}
      <div className="w-full md:w-1/3 bg-gray-100 rounded-lg shadow-md p-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-4">
          GPU Details
        </h2>
        <p className="text-lg font-medium">
          <span className="font-bold">Name:</span> {gpu.name}
        </p>
        <div className="mt-4">
          <p className="text-lg font-medium">
            <span className="font-bold">Specifications:</span>
          </p>
          <ul className="ml-4 space-y-2 text-gray-600">
            <li>
              <strong>Model:</strong> {gpu.model}
            </li>
            <li>
              <strong>Price:</strong> ${gpu.price}
            </li>
          </ul>
        </div>
      </div>

      {/* Bidding Dashboard */}
      <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-6 mt-6 md:mt-0 md:ml-6">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">
          Bidding Dashboard
        </h3>
        <div className="h-[400px] md:h-[600px] overflow-auto border border-gray-300 p-3 rounded">
          <BidCard bids={bids} highestBid={highestBid} status={gpu.status} />
        </div>

        {/* Place Bid Form */}
        <div className="mt-6">
          <h4 className="text-xl font-medium text-blue-600 text-center">Place Bid Here</h4>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center space-y-4 md:space-x-4"
          >
            {error && <p className="text-red-600">{error}</p>}
            <InputField
              type="number"
              name="formData"
              value={formData}
              onChange={handleInputChange}
              placeholder="Enter a bid"
              disabled={gpu.status === "closed"}
            />
            <Button
              type="submit"
              disabled={formData === "" || parseInt(formData, 10) < gpu.price}
            >
              Place Bid
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GPUPage;
