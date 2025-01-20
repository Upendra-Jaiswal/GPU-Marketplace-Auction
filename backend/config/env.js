const dotenv = require("dotenv");

const loadEnv = () => {
  dotenv.config({ path: "./.env" });

  if (!process.env.JWT_SECRET || !process.env.MONGO_URI) {
    console.error(
      "Missing critical environment variables: JWT_SECRET or MONGO_URI"
    );
    process.exit(1); // Exit process with failure
  }

};

module.exports = loadEnv;
