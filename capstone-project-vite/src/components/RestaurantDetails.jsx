import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRestaurantById } from "./api";

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const data = await fetchRestaurantById(id);
        setRestaurant(data.restaurant);
      } catch (error) {
        console.error("Cannot fetch restaurant details:", error);
        setError("Unable to load restaurant details");
      }
    };
    getRestaurant();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!restaurant) return <div>Loading...</div>;

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.address}</p>
      <p>Category: {restaurant.category}</p>
      <h2>Reviews</h2>
      <ul>
        {restaurant.reviews &&
          restaurant.reviews.length > 0 &&
          restaurant.reviews.map((review) => (
            <li key={review.id}>
              <p>Rating: {review.rating}</p>
              <p>{review.review_description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default RestaurantDetails;
