import { use, useEffect, useState } from "react";
import ResturantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../Utils/useOnlineStatus";

const Body = () => {
  const [listofRestaurants, setListofRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.8923983&lng=81.0581042&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();

      const restaurantCard = json?.data?.cards?.find(
        (card) =>
          card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      const restaurants =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      if (restaurants) {
        setListofRestaurants(restaurants);
        setFilteredRestaurants(restaurants);
      } else {
        console.warn("No restaurants found in API response");
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  const onlineStatus=useOnlineStatus();
  if(onlineStatus===false) return <h1>Looks Like you are Offline! Please check your internet connection !</h1>

  // 🟡 Show shimmer while data loads
  if (listofRestaurants.length === 0) {
    return <Shimmer />;
  }

return (
  <div className="p-6 bg-gray-50 min-h-screen">
    {/* Filter Section */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      
      {/* Search Input */}
      <div className="flex gap-2 w-full md:w-auto">
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          value={searchText}
          placeholder="Search restaurants..."
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
          onClick={() => {
            const filteredList = listofRestaurants.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRestaurants(filteredList);
          }}
        >
          Search
        </button>
      </div>

      {/* Top Rated Button */}
      <div>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
          onClick={() => {
            const filteredList = listofRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setFilteredRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
    </div>

    {/* Restaurant Cards */}
    <div className="flex flex-wrap gap-6 justify-center">
      {filteredRestaurants.map((restaurant) => (
        <Link
          key={restaurant.info.id}
          to={"/restaurants/" + restaurant.info.id}
        >
          <ResturantCard resData={restaurant} />
        </Link>
      ))}
    </div>
  </div>
);
}
export default Body;
