import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRestaurantById } from "./api";
import ReviewForm from "./ReviewForm";

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const data = await fetchRestaurantById(id);
        if (data && data.restaurant) {
          setRestaurant(data.restaurant);
        } else {
          setError("Restaurant not found");
        }
      } catch (error) {
        console.error("Cannot fetch restaurant details:", error);
        setError("Unable to load restaurant details");
      }
    };
    getRestaurant();
  }, [id]);

  const handleNewReview = (newReview) => {
    setRestaurant((prev) => ({
      ...prev,
      reviews: prev.reviews ? [...prev.reviews, newReview] : [newReview], // Fixed this line
    }));
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!restaurant) return <div>Loading...</div>;

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.address}</p>
      <p>Category: {restaurant.category}</p>
      <h2>Reviews</h2>
      <ul>
        {restaurant.reviews && restaurant.reviews.length > 0 ? (
          restaurant.reviews.map((review) => (
            <li key={review.id}>
              <p>Rating: {review.rating}</p>
              <p>{review.review_description}</p>
            </li>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </ul>
      <ReviewForm restaurantId={id} onNewReview={handleNewReview} />
    </div>
  );
}

export default RestaurantDetails;
