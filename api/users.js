const express = require("express");
const usersRouter = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../db/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//GET ALL USERS
usersRouter.get("/", authenticateToken, async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send({ users });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//get single user by ID
usersRouter.get("/:userID", authenticateToken, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    if (user) {
      res.send({ user });
    } else {
      next({
        name: "UserNotFoundError",
        message: "User not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

// POST login
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Needs a username and password",
    });
    return;
  }

  try {
    const user = await getUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user.id, username },
        process.env.JWT_SECRET,
        { expiresIn: "1w" }
      );
      res.send({ message: "You are logged in!", token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//POST register
usersRouter.post("/register", async (req, res, next) => {
  const { username, password, name, location } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with that name already exists ",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      username,
      password: hashedPassword,
      name,
      location,
    });
    const token = jwt.sign(
      { id: user.id, username },

      process.env.JWT_SECRET,
      { expiresIn: "1w " }
    );
    res.send({ message: "Signed up!", token });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//delete user
usersRouter.delete("/:userId", authenticateToken, async (req, res, next) => {
  try {
    const { userId } = req.params;
    await deleteUser(userId);
    res.send({ message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
});

//patch user
usersRouter.patch("/:userId", authenticateToken, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await updateUser(userId, {
      username,
      email,
      password: hashedPassword,
    });
    res.send({ message: "User has been updated", updatedUser });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
