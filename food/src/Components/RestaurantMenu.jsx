import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../Utils/useRestaurantMenu";
import Shimmer from "./Shimmer";
import RestaurantHeaderInfo from "./RestaurantHeaderInfo";
import MenuSection from "./MenuSection";
import OfferList from "./OfferList";

function RestaurantMenu() {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [error, setError] = useState("");
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    if (resInfo) {
      const sectionCards = resInfo.cards
        .find((card) => card.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards
        ?.filter(
          (card) =>
            card.card?.card["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) || [];

      const initialState = {};
      sectionCards.forEach((_, idx) => {
        initialState[idx] = true;
      });
      setOpenSections(initialState);
    }
  }, [resInfo]);

  if (error) return <div>{error}</div>;
  if (!resInfo) return <Shimmer />;

  const restaurantInfoCard = resInfo.cards.find(
    (card) => card?.card?.card?.info
  );
  const { name, cuisines, cloudinaryImageId } =
    restaurantInfoCard?.card?.card?.info || {};

  const imageUrl = cloudinaryImageId
    ? `https://media-assets.swiggy.com/swiggy/image/upload/${cloudinaryImageId}`
    : "";

  const menuSectionCards = resInfo.cards
    .find((card) => card.groupedCard)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards
    ?.filter(
      (card) =>
        card.card?.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  const offerCards = resInfo.cards.find(
    (card) =>
      card.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget"
  );
  const offers = offerCards?.card?.card?.gridElements?.infoWithStyle?.offers;

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans text-gray-800">
      <RestaurantHeaderInfo name={name} cuisines={cuisines} imageUrl={imageUrl} />

      {menuSectionCards.map((section, index) => (
        <MenuSection
          key={index}
          section={section}
          index={index}
          isOpen={openSections[index]}
          toggleSection={toggleSection}
        />
      ))}

      <OfferList offers={offers} />
    </div>
  );
}

export default RestaurantMenu;
