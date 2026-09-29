const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(cors());
app.use(express.json());

// Backend + PostgreSQL tekshirish
app.get("/", async (req, res) => {
  try {
    await pool.query("SELECT NOW()");
    res.json({
      message: "Backend API ishlayapti!",
      database: "PostgreSQL ulandi!"
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// O'quvchilar jadvalini yaratish
async function createTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      phone VARCHAR(30),
      group_name VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// O'quvchilarni olish
app.get("/students", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM students ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// Yangi o'quvchi qo'shish
app.post("/students", async (req, res) => {
  try {
    const { name, phone, group_name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Ism kiritilishi shart"
      });
    }

    const result = await pool.query(
      `INSERT INTO students (name, phone, group_name)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, phone || "", group_name || ""]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;

createTable()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server ${PORT} portda ishga tushdi`);
    });
  })
  .catch((err) => {
    console.error("Database xatosi:", err.message);
  });

