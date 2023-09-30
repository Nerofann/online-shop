const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "db.mgmuxvhdytgwuhsfwslh.supabase.co",
  database: "postgres",
  password: "1b1XqIUziT6ExpDk",
  dialect: "postgres",
  port: 5432,
});

pool.connect((err, client, release) => {
  release();
  if (err) return console.error(err);
  client.query("SELECT NOW()", (err, result) => {
    console.log("Database connection success.");
  });
});
module.exports = pool;
