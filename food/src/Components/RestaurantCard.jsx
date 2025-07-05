import CON_URL from "../Utils/contact";

const ResturantCard = ({ resData }) => {
  if (!resData?.info) return null;

  const {
    name = "Restaurant Name",
    cloudinaryImageId = "",
    avgRating = "N/A",
    cuisines = [],
    sla = {},
  } = resData.info;

  return (
    <div className="resturant-card">
      <img
        className="res-logo"
        src={CON_URL + cloudinaryImageId}
        alt={name}
      />
      <h2>{name}</h2>
      <h3>{avgRating} ⭐</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{sla.deliveryTime ?? "N/A"} minutes</h4>
    </div>
  );
};

export default ResturantCard;
