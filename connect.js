import sqlite3 from "sqlite3";

const db = new sqlite3.Database(
  "./collection.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("connected to the SQLite database.");
  }
);
// init users
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT
      )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("created items table.");
      db.run(`DELETE FROM users`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("all rows deleted from items");
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log("closed the database connection.");
        });
      });
    }
  );
});
