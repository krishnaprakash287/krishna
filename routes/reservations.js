const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

// CREATE
router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.redirect("/reservations/read");
  } catch (err) {
    res.status(500).send("Error creating reservation.");
  }
});

// READ
router.get("/read", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render("read", { reservations });
  } catch (err) {
    res.status(500).send("Error retrieving reservations.");
  }
});

// UPDATE
router.get("/update/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    res.render("update", { reservation });
  } catch (err) {
    res.status(500).send("Error finding reservation.");
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    await Reservation.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/reservations/read");
  } catch (err) {
    res.status(500).send("Error updating reservation.");
  }
});

// DELETE
router.get("/delete/:id", async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect("/reservations/read");
  } catch (err) {
    res.status(500).send("Error deleting reservation.");
  }
});

module.exports = router;
