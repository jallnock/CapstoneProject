import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRestaurantById } from "./api";
import ReviewForm from "./ReviewForm";
import { submitReview } from "./api";
import { deleteReview } from "./api";

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

  const handleNewReview = async (newReview) => {
    try {
      const savedReview = await submitReview({
        restaurant_id: restaurant.id,
        rating: newReview.rating,
        review_description: newReview.review_description,
      });

      setRestaurant((prev) => ({
        ...prev,
        reviews: [...(prev.reviews || []), savedReview],
      }));
    } catch (error) {
      console.error("Cannot submit review:", error);
      setError("Cannot submit review");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);

      setRestaurant((prev) => ({
        ...prev,
        reviews: prev.reviews.filter((review) => review.id !== reviewId),
      }));
    } catch (error) {
      console.error("Cannot delete review", error);
      setError("Cannot delete review");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!restaurant) return <div>Loading...</div>;

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.address}</p>
      <p>Category: {restaurant.category}</p>
      <h2>Reviews</h2>
      {restaurant.reviews && restaurant.reviews.length > 0 ? (
        <ul>
          {restaurant.reviews.map((review) => (
            <li key={review.id}>
              <p>Rating: {review.rating}</p>
              <p>{review.review_description}</p>
              <button onClick={() => handleDeleteReview(review.id)}>
                Delete Review
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet</p>
      )}

      <ReviewForm restaurantId={id} onNewReview={handleNewReview} />
    </div>
  );
}

export default RestaurantDetails;
