import { Link } from "react-router-dom";
import { FaRegHandshake, FaEdit, FaTrash, FaLock } from "react-icons/fa";

const GPUCard = ({ gpu, user, placeBid, handleDeleteGPU, closeAuction }) => {
  return (
    <div className="bg-gray-50 shadow-md rounded-xl p-6 border border-gray-300 hover:shadow-2xl transition-all duration-300 ease-in-out">
      <h2 className="text-2xl font-semibold text-gray-800">{gpu.name}</h2>
      <p className="text-gray-600 font-medium">{gpu.model}</p>
      <p className="text-green-500 font-bold text-lg">${gpu.price}</p>
      <p className="text-gray-500 text-sm mt-2">{gpu.description}</p>

      <div className="flex gap-6 mt-4">
        {/* Place Bid Button */}
        <button
          onClick={() => placeBid(gpu)}
          className={`flex items-center gap-2 px-5 py-2 rounded-full shadow-md transition-all duration-200 ease-in-out 
            ${
              gpu.status === "closed"
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600"
            }`}
        >
          <Link to="/placebid" className="flex items-center gap-2">
            <FaRegHandshake />
            {gpu.status === "closed" ? (
              <span>View Bid</span>
            ) : (
              <span>Place Bid</span>
            )}
          </Link>
        </button>

        {/* Edit Button (only for owner) */}
        {gpu.owner === user && gpu.status !== "closed" && (
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-5 py-2 rounded-full hover:from-blue-600 hover:to-teal-600 shadow-md transition-all duration-200 ease-in-out">
            <FaEdit />
            <Link to={`/editgpu`} state={{ gpuId: gpu._id }}>
              Edit
            </Link>
          </button>
        )}

        {/* Delete Button (only for owner) */}
        {gpu.owner === user && (
          <button
            onClick={() => handleDeleteGPU(gpu._id)}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-full hover:from-red-600 hover:to-pink-600 shadow-md transition-all duration-200 ease-in-out"
          >
            <FaTrash /> Delete
          </button>
        )}

        {/* Auction Closed Message */}
        {gpu.status === "closed" && (
          <span className="text-red-900 font-semibold">
            <span className="flex items-center gap-2 bg-gradient-to-r from-red-900 to-pink-900 text-white px-5 py-2 rounded-full hover:from-red-600 hover:to-pink-600 shadow-md transition-all duration-200 ease-in-out">
              <FaLock /> Auction Completed
            </span>
          </span>
        )}

        {/* Close Auction Button (only for owner) */}
        {gpu.owner === user && gpu.status !== "closed" && (
          <button
            onClick={() => closeAuction(gpu._id)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-5 py-2 rounded-full hover:from-purple-600 hover:to-indigo-600 shadow-md transition-all duration-200 ease-in-out"
          >
            <FaLock /> Close Auction
          </button>
        )}
      </div>
    </div>
  );
};

export default GPUCard;
