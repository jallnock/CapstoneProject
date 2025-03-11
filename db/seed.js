const { client, connect } = require("./index");

const seedData = async () => {
  await connect();
};

await client.query(`DELETE FROM reviews`);
await client.query(`DELETE FROM restaurants`);
await client.query(`DELETE FROM users`);

await client.query;
