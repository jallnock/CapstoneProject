import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllRestaurants } from "./api";

function RestaurantsList() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await fetchAllRestaurants();
        setRestaurants(data.restaurants || []);
        setLoading(false);
      } catch (error) {
        console.error("Cannot load restaurants", error);
        setError("Unable to load restaurants");
        setLoading(false);
      }
    };
    loadRestaurants();
  }, []);

  const filteredRestaurants = searchTerm
    ? restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : restaurants;

  if (loading) {
    return <div>Loading restaurants...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <h1>Restaurants</h1>
      <input
        type="text"
        placeholder="Search Restaurant Here"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {filteredRestaurants.length === 0 ? (
          <p>No restaurants found</p>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <h2>{restaurant.name}</h2>
              <p>{restaurant.address}</p>
              <p>Category: {restaurant.category}</p>
              <button onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
                View Details
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default RestaurantsList;
