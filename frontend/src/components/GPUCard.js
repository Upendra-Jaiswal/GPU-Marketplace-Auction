import { Link } from "react-router-dom";
import { FaRegHandshake, FaEdit, FaTrash, FaLock } from "react-icons/fa";

const GPUCard = ({ gpu, user, placeBid, handleDeleteGPU, closeAuction }) => {
  if (gpu.owner === user || gpu.status === "closed") {
    return null;
  }

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
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-5 py-2 rounded-full hover:from-yellow-600 hover:to-orange-600 shadow-md transition-all duration-200 ease-in-out"
        >
          <Link to="/placebid" className="flex items-center gap-2">
            <FaRegHandshake />
            <span>Place Bid</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default GPUCard;
