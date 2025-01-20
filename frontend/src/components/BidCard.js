import React from "react";
import { FaTrophy } from "react-icons/fa";

const BidCard = ({ bids, highestBid, status }) => {
  return (
    <div className="mt-4 space-y-2 h-[700px] overflow-y-auto border border-gray-300 p-2 rounded">
      {bids.length > 0 ? (
        bids
          .sort((a, b) => b.amount - a.amount)
          .map((bid, index) => (
            <div
              key={index}
              className="bg-gray-100 p-3 rounded-lg flex items-center justify-between border border-gray-300 shadow-sm"
            >
              {/* Bidder Name */}
              <span className="text-gray-700 font-medium">
                {bid.bidder?.name || "Anonymous"}
              </span>

              {status === "closed" && bid.amount === highestBid && (
                <span className="text-green-600 font-bold flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full shadow-md">
                  <FaTrophy className="text-yellow-500 text-xl" /> Winner
                </span>
              )}

              {/* Bid Amount */}
              <span className="text-blue-400 font-bold text-lg">
                ${bid.amount}
              </span>
            </div>
          ))
      ) : (
        <p className="text-gray-500">No bids placed yet.</p>
      )}
    </div>
  );
};

export default BidCard;
