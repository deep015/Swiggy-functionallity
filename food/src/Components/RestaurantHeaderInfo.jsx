import React from "react";

const RestaurantHeaderInfo = ({ name, cuisines, imageUrl }) => {
  return (
    <div className="flex items-start gap-6 mb-8">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-48 h-48 object-cover rounded-lg shadow"
        />
      )}
      <div>
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <p className="text-gray-600 text-sm">
          <strong>Cuisines:</strong> {cuisines?.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default RestaurantHeaderInfo;
