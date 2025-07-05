import React, { useEffect, useState } from "react";

function RestaurantMenu() {
  const [resInfo, setResInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.8923983&lng=81.0581042&restaurantId=59505&catalog_qa=undefined&submitAction=ENTER"); // Your backend proxy
      const json = await response.json();
      console.log(json);
      setResInfo(json.data);
      
    } catch (err) {
      console.error(err);
      setError("Failed to fetch menu.");
    }
  };

  if (error) return <div>{error}</div>;
  if (!resInfo) return <div>Loading menu...</div>;

  // Extract restaurant details
  const restaurantInfoCard = resInfo.cards.find(
    (card) => card?.card?.card?.info
  );
  const { name, cuisines, cloudinaryImageId } = restaurantInfoCard.card.card.info;

  const imageUrl = cloudinaryImageId
    ? `https://media-assets.swiggy.com/swiggy/image/upload/${cloudinaryImageId}`
    : "";

  // Extract all item category sections
  const menuSectionCards = resInfo.cards
    .find((card) => card.groupedCard)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards
    ?.filter(
      (card) =>
        card.card?.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

    const offerCards=resInfo.cards.find((card)=>card.card?.card?.["@type"]===
      "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget");

      const offers = offerCards?.card?.card?.gridElements?.infoWithStyle?.offers;

      
     return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {/* Restaurant Info */}
      <div style={{ marginBottom: "30px" }}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            style={{ width: "200px", borderRadius: "8px" }}
          />
        )}
        <h1>{name}</h1>
        <p><strong>Cuisines:</strong> {cuisines.join(", ")}</p>
      </div>

      {/* Menu Sections */}
      {menuSectionCards.map((section, index) => (
        <div key={index} style={{ marginBottom: "30px" }}>
          <h2 style={{ borderBottom: "1px solid #ccc" }}>{section.card.card.title}</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {section.card.card.itemCards.map((itemCard, idx) => {
              const item = itemCard.card.info;
              return (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "10px 0",
                    borderBottom: "1px solid #eee"
                  }}
                >
                  <div>
                    <h4 style={{ margin: "0 0 5px" }}>{item.name}</h4>
                    {item.description && (
                      <p style={{ margin: "0 0 5px", fontSize: "0.9em", color: "#666" }}>
                        {item.description}
                      </p>
                    )}
                    <p style={{ margin: 0 }}>
                      ₹{(item.price || item.defaultPrice) / 100}
                    </p>
                  </div>
                  {item.imageId && (
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                      alt={item.name}
                      style={{ width: "90px", height: "90px", borderRadius: "8px", objectFit: "cover" }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

    {/* Offers section */}
    {Array.isArray(offers) && offers.length > 0 ? (
      <div style={{ marginBottom: "30px" }}>
        <h2>Available Offers</h2>
        <ul style={{ paddingLeft: "20px" }}>
          {offers.map((offerObj, index) => {
            const info = offerObj?.info;
            return (
              <li key={index} style={{ marginBottom: "8px", color: "#444" }}>
                {info?.header} - {info?.couponCode && `Use: ${info.couponCode}`}
              </li>
            );
          })}
        </ul>
      </div>
    ) : (
      <p style={{ color: "#999" }}>No offers available.</p>
    )}

    </div>
  );
}

export default RestaurantMenu;
