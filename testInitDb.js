// testInitDb.js
require('dotenv').config();
const initDb = require('./config/initDb');

(async () => {
  await initDb();
  console.log("Database initialization test completed.");
  process.exit();
})();
