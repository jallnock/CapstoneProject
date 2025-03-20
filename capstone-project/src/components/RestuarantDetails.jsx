import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/restaurants/${id}`
        );
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error("Cannot fetch restaurant details:", error);
      }
    };
  });
}
