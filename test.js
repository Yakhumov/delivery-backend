require('dotenv').config();
const { Pool } = require('pg');

console.log("START");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000
});

async function run() {
  try {
    const client = await pool.connect();
    console.log("CONNECTED");

    const res = await client.query('SELECT NOW()');
    console.log("TIME:", res.rows[0]);

    client.release();
  } catch (err) {
    console.error("ERROR:", err);
  } finally {
    await pool.end();
  }
}

run();