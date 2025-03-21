require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const server = express();

server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

server.use(express.json());
server.use(morgan("dev"));

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");
  next();
});

const apiRouter = require("./api");
server.use("/api", apiRouter);

const { client } = require("./db");
client.connect();

const path = require("path");
server.use(express.static(path.join(__dirname, "public")));

const { PORT = 3000 } = process.env;
server.listen(PORT, () => {
  console.log("The server is running on port", PORT);
});
