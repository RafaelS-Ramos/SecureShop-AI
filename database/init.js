const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const db = new sqlite3.Database("./database/database.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'USER',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      action TEXT NOT NULL,
      ip TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const adminPassword = bcrypt.hashSync("admin123", 10);

  db.run(
    `INSERT OR IGNORE INTO users (id, name, email, password, role)
     VALUES (1, ?, ?, ?, ?)`,
    ["Admin", "admin@secureshop.com", adminPassword, "ADMIN"]
  );

  db.run(`
    INSERT OR IGNORE INTO products (id, name, description, price, category, stock)
    VALUES
    (1, 'Notebook Dev Pro', 'Notebook for programming and cybersecurity labs', 3500.00, 'Computers', 5),
    (2, 'Mechanical Keyboard', 'Keyboard for developers and gamers', 250.00, 'Accessories', 20),
    (3, 'Linux Security Book', 'Book about Linux and cybersecurity fundamentals', 120.00, 'Books', 15),
    (4, 'USB Security Key', 'Hardware key for multi-factor authentication', 180.00, 'Security', 10)
  `);

  console.log("Database initialized successfully.");
});

db.close();
