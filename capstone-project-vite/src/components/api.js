export const loginUser = async ({ username, password }) => {
  const response = await fetch(`http://localhost:3000/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Incorrect email or password");
  }
  const data = await response.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

export const registerUser = async ({ username, email, password }) => {
  const response = await fetch(`http://localhost:3000/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }
  const data = await response.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};

export const submitReview = async ({
  restaurant_id,
  rating,
  review_description,
}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`http://localhost:3000/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ restaurant_id, rating, review_description }),
  });
  if (!response.ok) {
    throw new Error("Failed to post review");
  }
  return response.json();
};

export const fetchRestaurantById = async (id) => {
  const response = await fetch(`http://localhost:3000/api/restaurants/${id}`);
  if (!response.ok) {
    throw new Error("Cannot fetch restaurant");
  }
  return response.json();
};

export const fetchAllRestaurants = async () => {
  const response = await fetch(`http://localhost:3000/api/restaurants`);
  if (!response.ok) {
    throw new Error("Cannot fetch restaurants");
  }
  return response.json();
};

export const fetchAccount = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Cannot fetch user account");
  }
  return response.json();
};

export const fetchCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Cannot fetch this user");
  }
  return response.json();
};
