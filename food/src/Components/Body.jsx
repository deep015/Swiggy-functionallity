import { useEffect, useState } from "react";
import ResturantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

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

  // 🟡 Show shimmer while data loads
  if (listofRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            placeholder="Search restaurants..."
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="filter-btn"
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

        <div>
          <button
            className="filter-btn"
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

      <div className="resturant-container">
        {filteredRestaurants.map((restaurant) => (
          <ResturantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
