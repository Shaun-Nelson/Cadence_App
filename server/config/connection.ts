const { connect, connection } = require("mongoose");
require("dotenv").config();

const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI
    : "mongodb://localhost:27017/cadence_db";

const connectDB = async () => {
  try {
    const conn = await connect(connectionString);
    console.log(`Connected to the database: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to the database: ", error);
    process.exit(1);
  }
};

connectDB();

module.exports = connection;
