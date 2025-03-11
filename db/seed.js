const { client, connect } = require("./index");

const seedData = async () => {
  await connect();

  try {
    await client.query(`DELETE FROM reviews`);
    await client.query(`DELETE FROM restaurants`);
    await client.query(`DELETE FROM users`);

    await client.query(`
    INSERT INTO users (username, email, password) VALUES
    ("user1", "user1@me.com", "password1"),
    ("user2", "user2@me.com", "password2"),
    ("user3", "user3@me.com", "password3"),
    ("user4", "user4@me.com", "password4"), 
    ("user5", "user5@me.com", "password5")
    `);

    await client.query(`
      INSERT INTO restaurants (name, address, category) VALUES
      ("Lazy Moon", 123 Pizza St", "Pizza"), 
      ("Chinese Tuxedo", "345 East Ave", "Chinese"), 
      ("JG Melon", "222 E 79th St", "Burgers"), 
      ("Monkey Bar", "777 E 54th St", "Steakhouse"), 
      ("Lure Fishbar", 555 E 14th St", "Sushi")
      ("Gelataria", "234 E 86th St", "Ice Cream")
      `);

    await client.query(`
        INSERT INTO reviews (user_id, restaurant_id, rating, review_description) VALUES
        (1, 1, 5, "Best pizza in town!"),
        (2, 2, 4, "Such a fancy place. Great for a date night."),
        (3, 3, 4, "Cash only restaurant! The burger is famous for a reason."), 
        (4, 4, 5, "A bit pricey, but totally worth it."), 
        (5, 5, 2, "Not the best sushi I have ever had, especially not for the price tag."), 
        (6, 6, 1, "Do not come here by any means. Will not be returning!")
        `);

    console.log("Database seeded");
  } catch (error) {
    console.error("Database not seeded");
  }

  client.end();
};

seedData();
