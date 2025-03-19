const { Client } = require("pg");

const client = new Client({
  user: "jenna",
  host: "localhost",
  database: "restaurant_review_db",
  password: "Welcome123!",
  port: 3000,
});

const connect = async () => {
  try {
    await client.connect();
    console.log("connected to the database");
  } catch (error) {
    console.error("cannot connect to database");
  }
};

//reviews functions
const getAllReviews = async () => {
  const res = await client.query("SELECT * FROM reviews");
  return res.rows;
};

const getReviewsById = async (id) => {
  const res = await client.query("SELECT * FROM reviews WHERE id = $1", [id]);
  return res.rows[0];
};

const createReview = async ({
  user_id,
  restaurant_id,
  rating,
  review_description,
}) => {
  const res = await client.query(
    "INSERT INTO reviews (user_id, restaurant_id, rating, review_description) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_id, restaurant_id, rating, review_description]
  );
  return res.rows[0];
};

const updateReview = async (id, { rating, review_description }) => {
  const res = await client.query(
    "UPDATE reviews SET rating = $1, review_description = $2 WHERE id = $3 RETURNING *",
    [rating, review_description, id]
  );
  return res.rows[0];
};

const deleteReview = async (id) => {
  await client.query("DELETE FROM reviews WHERE id = $1", [id]);
};

//restaurant functions
const getAllRestaurants = async () => {
  const res = await client.query("SELECT * FROM restaurants");
  return res.rows;
};

const getRestaurantById = async (id) => {
  const res = await client.query("SELECT * FROM restaurants WHRERE id = $1", [
    id,
  ]);
  return res.rows[0];
};

const createRestaurant = async ({ name, address, phone, website, hours }) => {
  const res = await client.query(
    "INSERT INTO restaurants (name, address, phone, website, hours) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, address, phone, website, hours]
  );
  return res.rows[0];
};

const updateRestaurant = async (
  id,
  { name, address, phone, website, hours }
) => {
  const res = await client.query(
    "UPDATE restaurants SET name = $1, address = $2, phone = $3, website = $4, hours = $5 WHERE id = $6 RETURNING *",
    [name, address, phone, website, hours, id]
  );
  return res.rows[0];
};

const deleteRestaurant = async (id) => {
  await client.query("DELETE FROM restaurants WHERE id = $1", [id]);
};

//user functions
const getAllUsers = async () => {
  const res = await client.query("SELECT * FROM users");
  return res.rows;
};

const getUserById = async (id) => {
  const res = await client.query("SELECT * FROM users WHERE id = $1", [id]);
  return res.rows[0];
};

const createUser = async ({ username, email, password }) => {
  const res = await client.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, password]
  );
  return res.rows[0];
};

const updateUser = async (id, { username, email, password }) => {
  const res = await client.query(
    "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
    [user]
  );
};

module.exports = { client, connect };
