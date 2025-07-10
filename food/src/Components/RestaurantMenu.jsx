import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_API } from "../Utils/contact";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../Utils/useRestaurantMenu";

function RestaurantMenu() {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [error, setError] = useState("");

  if (error) return <div>{error}</div>;
  if (!resInfo) return <Shimmer />;

  // Extract restaurant details
  const restaurantInfoCard = resInfo.cards.find(
    (card) => card?.card?.card?.info
  );
  const { name, cuisines, cloudinaryImageId } =
    restaurantInfoCard.card.card.info;

  const imageUrl = cloudinaryImageId
    ? `https://media-assets.swiggy.com/swiggy/image/upload/${cloudinaryImageId}`
    : "";

  // Extract menu categories
  const menuSectionCards = resInfo.cards
    .find((card) => card.groupedCard)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards
    ?.filter(
      (card) =>
        card.card?.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  // Extract offers
  const offerCards = resInfo.cards.find(
    (card) =>
      card.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget"
  );
  const offers = offerCards?.card?.card?.gridElements?.infoWithStyle?.offers;

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans text-gray-800">
      {/* Restaurant Info */}
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
            <strong>Cuisines:</strong> {cuisines.join(", ")}
          </p>
        </div>
      </div>

      {/* Menu Sections */}
      {menuSectionCards?.map((section, index) => (
        <div key={index} className="mb-10">
          <h2 className="text-xl font-semibold border-b pb-1 mb-4">
            {section.card.card.title}
          </h2>
          <ul className="divide-y">
            {section.card.card.itemCards.map((itemCard, idx) => {
              const item = itemCard.card.info;
              return (
                <li
                  key={idx}
                  className="py-4 flex justify-between items-start gap-4"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-lg mb-1">{item.name}</h4>
                    {item.description && (
                      <p className="text-sm text-gray-500 mb-1">
                        {item.description}
                      </p>
                    )}
                    <p className="text-sm font-semibold">
                      ₹{(item.price || item.defaultPrice) / 100}
                    </p>
                  </div>
                  {item.imageId && (
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md shadow"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Offers Section */}
      {Array.isArray(offers) && offers.length > 0 ? (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Available Offers</h2>
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
      ) : (
        <p className="text-gray-400">No offers available.</p>
      )}
    </div>
  );
}

export default RestaurantMenu;

