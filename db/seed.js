const { client, connect } = require("./index");

async function dropTables() {
  try {
    console.log("Dropping tables");
    await client.query(`
      DROP TABLE IF EXISTS comments;
      DROP TABLE IF EXISTS reviews; 
      DROP TABLE IF EXISTS restaurants; 
      DROP TABLE IF EXISTS users; 
      `);
    console.log("Finished dropping tables");
  } catch (error) {
    console.error("Cannot drop tables, error.message");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables");
    await client.query(`
         CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL, 
        email VARCHAR(100) NOT NULL, 
        password VARCHAR(100) NOT NULL
        );
          CREATE TABLE restaurants (
          id SERIAL PRIMARY KEY, 
          name VARCHAR(100) NOT NULL, 
          address VARCHAR(200) NOT NULL, 
          category VARCHAR(50) NOT NULL
          );

          CREATE TABLE reviews (
            id SERIAL PRIMARY KEY, 
            user_id INTEGER REFERENCES users(id), 
            restaurant_id INTEGER REFERENCES restaurants(id),
            rating INTEGER NOT NULL, 
            review_description TEXT NOT NULL
            );
            CREATE TABLE comments (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            review_id INTEGER REFERENCES reviews(id),
            comment_text TEXT NOT NULL
            );
        `);

    console.log("Finished building tables");
  } catch (error) {
    console.error("Error building tables", error.message);
  }
}

async function createInitialUsers() {
  try {
    console.log("Creating users");
    await client.query(` 
          INSERT INTO users (username, email, password) VALUES
          ('user1', 'user1@me.com', 'password1'),
          ('user2', 'user2@me.com', 'password2'),
          ('user3', 'user3@me.com', 'password3'),
          ('user4', 'user4@me.com', 'password4'), 
          ('user5', 'user5@me.com', 'password5')
          `);

    console.log("Done creating users");
  } catch (error) {
    console.error("error creating users", error.message);
    throw error;
  }
}

async function createInitialRestaurants() {
  try {
    console.log("Creating restaurants");
    await client.query(`INSERT INTO restaurants (name, address, category) VALUES
      ('Lazy Moon', '123 Pizza St', 'Pizza'), 
      ('Chinese Tuxedo', '345 East Ave', 'Chinese'), 
      ('JG Melon', '222 E 79th St', 'Burgers'), 
      ('Monkey Bar', '777 E 54th St', 'Steakhouse'), 
      ('Lure Fishbar', '555 E 14th St', 'Sushi')
      `);

    console.log("Done creating restaurants");
  } catch (error) {
    console.error("cannot create restaurants", error.message);
    throw error;
  }
}

async function createInitialReviews() {
  try {
    console.log("Creating reviews");
    await client.query(`INSERT INTO reviews (user_id, restaurant_id, rating, review_description) VALUES
      (1, 1, 5, 'Best pizza in town!'),
      (2, 2, 4, 'Such a fancy place. Great for a date night.'),
      (3, 3, 4, 'Cash only restaurant! The burger is famous for a reason.'), 
      (4, 4, 5, 'A bit pricey, but totally worth it.'), 
      (5, 5, 2, 'Not the best sushi I have ever had, especially not for the price tag.') 
      `);
    console.log("Done creating reviews");
  } catch (error) {
    console.error("Cannot create reviews", error.message);
  }
}

async function createInitialComments() {
  try {
    console.log("Creating comments");
    await client.query(`
      INSERT INTO comments (user_id, review_id, comment_text) VALUES
      (1, 1, 'I thought the same. Such amazing pizza!'),
      (2, 2, 'I went on a date here. Such a great spot.'),
      (3, 3, 'Thanks for the rec. The burger was to die for!!'),
      (4, 4, 'I disagree. Way too overpriced...'),
      (5, 5, 'Hmm interesting take. I actually really enjoyed it!')
      `);
    console.log("Finished creating comments");
  } catch (error) {
    console.error("Cannot add comment", error.message);
    throw error;
  }
}

async function rebuildDB() {
  try {
    await connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialRestaurants();
    await createInitialReviews();
    await createInitialComments();
  } catch (error) {
    console.error("Error", error.message);
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Testing DB");

    const users = await client.query("SELECT * FROM users");
    console.log("Users:", users.rows);

    const restaurants = await client.query("SELECT * FROM restaurants");
    console.log("Restaurants:", restaurants.rows);

    const reviews = await client.query("SELECT * FROM reviews");
    console.log("Reviews:", reviews.rows);

    const comments = await client.query("SELECT * FROM comments");
    console.log("Comments", comments.rows);

    console.log("Finished testing DB");
  } catch (error) {
    console.error("Error in DB", error.message);
    throw error;
  }
}

rebuildDB().then(testDB).catch(console.error);
