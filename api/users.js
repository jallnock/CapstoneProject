const express = require("express");
const usersRouter = express.Router();
const { createUser, getAllUsers, getUserByUsername } = require("../db");
const jwt = require("jsonwebtoken");

//GET ALL USERS
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send({ users });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST login
uusersRouter.post("/login", async (req, res, next) => {
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
    if (user && user.password === password) {
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
    const user = await createUser({ username, password, name, location });
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

module.exports = usersRouter;
