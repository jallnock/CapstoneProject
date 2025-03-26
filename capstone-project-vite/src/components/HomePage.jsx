import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllRestaurants } from "./api";

function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await fetchAllRestaurants();
        setRestaurants(data.restaurants);
      } catch (error) {
        console.error("Cannot fetch restaurants:", error);
      }
    };
    fetchRestaurants();
  }, []);

  const handleAddRestaurantClick = () => {
    navigate("/add-restaurant");
  };

  return (
    <div>
      <h1>Restaurant Review Buddy!</h1>
      <button onClick={handleAddRestaurantClick}>Add A New Restaurant</button>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} style={{ marginBottom: "2rem" }}>
            <h2>
              <Link to={`/restaurant/${restaurant.id}`}>{restaurant.name}</Link>
            </h2>
            <p>{restaurant.address}</p>
            <p>{restaurant.category}</p>

            <h4>Reviews:</h4>
            <ul>
              {restaurant.reviews && restaurant.reviews.length > 0 ? (
                restaurant.reviews.map((review) => (
                  <li key={review.id}>
                    <p>Rating: {review.rating}</p>
                    <p>{review.review_description}</p>
                  </li>
                ))
              ) : (
                <li>No reviews yet.</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
