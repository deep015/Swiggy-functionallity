import React from "react";

const OfferList = ({ offers }) => {
  if (!Array.isArray(offers) || offers.length === 0) {
    return <p className="text-gray-400">No offers available.</p>;
  }

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">🎁 Available Offers</h2>
      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
        {offers.map((offerObj, index) => {
          const info = offerObj?.info;
          return (
            <li key={index}>
              {info?.header}{" "}
              {info?.couponCode && (
                <span className="text-emerald-600 font-medium">
                  (Use: {info.couponCode})
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OfferList;
