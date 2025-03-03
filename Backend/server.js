require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");
const userRoutes = require("./routes/user");  
const authRoutes = require("./routes/auth");  

const app = express();
app.use(cors());
app.use(express.json());

// Static folder for uploads (to serve uploaded files)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/user", userRoutes); 
app.use("/api/auth", authRoutes); 

app.get("/", (req, res) => {
    res.send("Gem Store Platform API is running...");
});


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("join_call", (room) => {
    socket.join(room);
    socket.to(room).emit("user_joined", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database");
});
// Middleware
app.use(express.json());




//jobs
app.get("/api/jobs", (req, res) => {
    db.query("SELECT * FROM jobs", (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    });
  });

  // Add this route in server.js
app.post("/api/jobs", (req, res) => {
  const { title, company, location, description, skills_required, email, closing_date } = req.body;

  const query = "INSERT INTO jobs (title, company, location, description, skills_required, email, closing_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(query, [title, company, location, description, skills_required, email, closing_date], (err, result) => {
      if (err) {
          console.error("Error inserting job:", err);
          return res.status(500).json({ error: "Failed to add job" });
      }
      res.status(201).json({ message: "Job added successfully", jobId: result.insertId });
  });
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




