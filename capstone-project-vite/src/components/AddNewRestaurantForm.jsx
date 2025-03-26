import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRestaurant } from "./api";

function AddRestaurantForm({ setRestaurants }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !address || !category) {
      setError("Fill in all fields");
      return;
    }

    try {
      console.log("adding restaurant", { name, address, category });
      const newRestaurant = await addRestaurant({
        name,
        address,
        category,
      });

      console.log("new restaurant added", newRestaurant);

      setRestaurants((prev) => [...prev, newRestaurant]);

      navigate("/");
    } catch (error) {
      setError("Cannot add restaurant.");
    }
  };
  return (
    <div>
      <h1>Add New Restaurant To Be Reviewed</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Add Restaurant</button>
      </form>
    </div>
  );
}

export default AddRestaurantForm;
