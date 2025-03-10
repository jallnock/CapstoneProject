const pg = require("pg");

const client = new pg.Client(
  "postgres://jennaallnock:Welcome123!@localhost:5432/restaurant_review_db"
);

const connect = async () => {
  try {
    await client.connect();
    console.log("connected to the database");
  } catch (error) {
    console.error("cannot connect to database");
  }
};

module.exports = { client, connect };
