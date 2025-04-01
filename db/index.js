const { Client } = require("pg");
const usersRouter = require("./api/users"); // 👈 path may vary

const client = new Client({
  user: "jenna",
  host: "localhost",
  database: "restaurant_review_db",
  password: "Welcome123!",
  port: 5432,
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
  const { rows: restaurants } = await client.query("SELECT * FROM restaurants");
  for (let restaurant of restaurants) {
    const { rows: reviews } = await client.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [restaurant.id]
    );
    restaurant.reviews = reviews;
  }
  return restaurants;
};

const getRestaurantById = async (id) => {
  const {
    rows: [restaurant],
  } = await client.query("SELECT * FROM restaurants WHERE id = $1", [id]);

  if (!restaurant) {
    return null;
  }

  const { rows: reviews } = await client.query(
    "SELECT * FROM reviews WHERE restaurant_id = $1",
    [id]
  );

  restaurant.reviews = reviews;

  return restaurant;
};

const createRestaurant = async ({ name, address, category }) => {
  const res = await client.query(
    "INSERT INTO restaurants (name, address, category) VALUES ($1, $2, $3) RETURNING *",
    [name, address, category]
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
  const userId = parseInt(id);
  if (isNaN(userId)) {
    throw new Error("Invalid user ID passed to getUserById");
  }

  console.log(" getUserById received ID:", userId);

  const res = await client.query("SELECT * FROM users WHERE id = $1", [userId]);
  console.log("👉 User query result:", res.rows);

  return res.rows[0];
};

const getUserByUsername = async (username) => {
  const {
    rows: [user],
  } = await client.query("SELECT * FROM users WHERE username = $1", [username]);
  return user;
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
    [username, email, password, id]
  );
  return res.rows[0];
};

const deleteUser = async (id) => {
  await client.query("DELETE FROM users WHERE id = $1", [id]);
};

//comment functions
const getAllComments = async () => {
  const res = await client.query("SELECT * FROM comments");
  return res.rows;
};

const getCommentById = async (id) => {
  const res = await client.query("SELECT * FROM comments WHERE id = $1", [id]);
  return res.rows[0];
};

const createComment = async ({ user_id, review_id, comment_text }) => {
  const res = await client.query(
    "INSERT INTO comments (user_id, review_id, comment_text) VALUES ($1, $2, $3) RETURNING *",
    [user_id, review_id, comment_text]
  );
  return res.rows[0];
};

const updateComment = async (id, { comment_text }) => {
  const res = await client.query(
    "UPDATE comments SET comment_text = $1 WHERE id = $2 RETURNING *",
    [comment_text, id]
  );
  return res.rows[0];
};

const deleteComment = async (id) => {
  await client.query("DELETE FROM comments WHERE id = $1", [id]);
};

module.exports = {
  client,
  connect,
  getAllReviews,
  getReviewsById,
  createReview,
  updateReview,
  deleteReview,
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  getAllComments,
  getCommentById,
  updateComment,
  createComment,
  deleteComment,
};
