const dotenv = require("dotenv")
const path = require("path")

let root = path.join.bind(this, __dirname);

dotenv.config({
  path: root("../.env")
});

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_KEY: process.env.JWT
}