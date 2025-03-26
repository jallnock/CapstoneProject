import React, { useState } from "react";
import { submitReview } from "./api";

function ReviewForm({ restaurantId, onNewReview }) {
  const [rating, setRating] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      onNewReview({
        rating,
        review_description: reviewDescription,
      });

      setRating("");
      setReviewDescription("");
      setError(null);
    } catch (error) {
      setError("Cannot post review");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Post a Review!</h3>
      <label>
        Rating (1-5):
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Your Review:
        <textarea
          value={reviewDescription}
          onChange={(e) => setReviewDescription(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Post Review</button>
    </form>
  );
}

export default ReviewForm;
