import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRestaurantById, submitReview, deleteReview } from "./api";
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

  if (error)
    return (
      <p style={{ color: "red", padding: "2rem", textAlign: "center" }}>
        {error}
      </p>
    );

  if (!restaurant)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
    );

  return (
    <div className="page-content">
      <div className="container">
        <div className="restaurant-card">
          <h2>{restaurant.name}</h2>
          <p>{restaurant.address}</p>
          <p>{restaurant.category}</p>

          <h3>Reviews:</h3>
          {restaurant.reviews && restaurant.reviews.length > 0 ? (
            restaurant.reviews.map((review) => (
              <div className="review" key={review.id}>
                <p className="review-rating">Rating: {review.rating}</p>
                <p>{review.review_description}</p>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  Delete Review
                </button>
              </div>
            ))
          ) : (
            <p className="no-reviews">No reviews yet.</p>
          )}
        </div>

        <ReviewForm restaurantId={id} onNewReview={handleNewReview} />
      </div>
    </div>
  );
}

export default RestaurantDetails;
