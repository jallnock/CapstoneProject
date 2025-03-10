const { Client } = require("pg");

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

module.exports = { client, connect };
