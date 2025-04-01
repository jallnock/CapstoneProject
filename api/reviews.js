const express = require("express");
const reviewsRouter = express.Router();
const {
  getAllReviews,
  getReviewsById,
  createReview,
  updateReview,
  deleteReview,
} = require("../db/index");

//GET ALL REVIEWS
reviewsRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.send({ reviews });
  } catch (error) {
    next(error);
  }
});

// GET A SINGLE REVIEW BY ID
reviewsRouter.get("/:reviewID", async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const review = await getReviewsById(reviewId);
    if (review) {
      res.send({ review });
    } else {
      next({
        name: "ReviewNotFoundError",
        message: "Review not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

//POST NEW REVIEW
reviewsRouter.post("/", async (req, res, next) => {
  try {
    const { user_id, restaurant_id, rating, review_description } = req.body;
    const newReview = await createReview({
      user_id,
      restaurant_id,
      rating,
      review_description,
    });
    res.send({ newReview });
  } catch (error) {
    next(error);
  }
});

//PATCH / UPDATE review
reviewsRouter.patch("/:reviewId", async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { rating, review_description } = req.body;
    const updatedReview = await updateReview(reviewId, {
      rating,
      review_description,
    });
    res.send({ message: "Review updated", updatedReview });
  } catch (error) {
    next(error);
  }
});

// DELETE review
reviewsRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    await deleteReview(reviewId);
    res.send({ message: "Review deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = reviewsRouter;
