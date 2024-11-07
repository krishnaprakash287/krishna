const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const reservationRoutes = require("./routes/reservations");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "mySecret", resave: false, saveUninitialized: true }));


// Setting EJS as the template engine
app.set("view engine", "ejs");

// Routes
app.use("/reservations", reservationRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
