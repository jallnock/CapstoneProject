import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
}

useEffect(() => {
  const fetchRestaurants = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/restaurants");
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error("Cannot fetch restaurants:", error);
    }
  };
  fetchRestaurants();
}, []);

return (
  <div>
    <h1>Restaurant Review Buddy!</h1>
    <ul>
      {restaurants.map((restaurant) => (
        <li key={restaurant.id}>
          <Link to={`/restaurant/${restaurant.id}`}>{restaurant.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default HomePage;
