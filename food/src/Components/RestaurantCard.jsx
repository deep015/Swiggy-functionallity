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
    <div className="w-64 bg-white rounded-xl shadow-md p-4 m-3 hover:shadow-lg hover:scale-105 transition-transform duration-300">
      <img
        className="w-full h-40 object-cover rounded-lg mb-3"
        src={CON_URL + cloudinaryImageId}
        alt={name}
      />
      <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
      <h3 className="text-sm text-yellow-500 font-medium">{avgRating} ⭐</h3>
      <h4 className="text-sm text-gray-600 mt-1 truncate">{cuisines.join(", ")}</h4>
      <h4 className="text-sm text-gray-600 mt-1">
        {sla.deliveryTime ?? "N/A"} minutes
      </h4>
    </div>
  );
};

export default ResturantCard;
