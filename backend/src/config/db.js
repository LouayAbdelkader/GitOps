const { Pool } = require("pg");

// ⚠️ PAS de dotenv en Kubernetes (recommandé)
// require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const connectWithRetry = async () => {
  let attempts = 20;

  while (attempts > 0) {
    try {
      await pool.query("SELECT 1");
      console.log("-> PostgreSQL connected");
      return;
    } catch (err) {
      attempts--;

      console.log(
        `DB not ready (${20 - attempts}/20) - ${err.code || err.message}`
      );

      await sleep(2000);
    }
  }

  console.error("Database connection failed permanently");
  process.exit(1);
};

connectWithRetry();

module.exports = pool;