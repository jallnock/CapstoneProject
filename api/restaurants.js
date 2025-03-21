const express = require("express");
const restaurantsRouter = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../db/index");

//GET all restaurants
restaurantsRouter.get("/", async (req, res, next) => {
  try {
    const restaurants = await getAllRestaurants();
    res.send({ restaurants });
  } catch (error) {
    next(error);
  }
});

// GET RESTAURANT BY ID
restaurantsRouter.get("/:restaurantId", async (req, res, next) => {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const restaurant = await getRestaurantById(restaurantId);
    if (restaurant) {
      res.send({ restaurant });
    } else {
      next({
        name: "RestaurantNotFoundError",
        message: "Restaurant not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

//POST NEW RESTAURANT
restaurantsRouter.post("/", async (req, res, next) => {
  try {
    const { name, address, category } = req.body;
    const newRestaurant = await createRestaurant({ name, address, category });
    res.send({ message: "Restaurant created:", newRestaurant });
  } catch (error) {
    next(error);
  }
});

//PATCH update restaurant
restaurantsRouter.patch("/:restaurantId", async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const { name, address, category } = req.body;
    const updatedRestaurant = await updateRestaurant(restaurantId, {
      name,
      address,
      category,
    });
    res.send({ message: "Restaurant updated", updatedRestaurant });
  } catch (error) {
    next(error);
  }
});

// DELETE a restaurant
restaurantsRouter.delete("/:restaurantId", async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    await deleteRestaurant(restaurantId);
    res.send({ message: "Restaurant deleted " });
  } catch (error) {
    next(error);
  }
});

module.exports = restaurantsRouter;
