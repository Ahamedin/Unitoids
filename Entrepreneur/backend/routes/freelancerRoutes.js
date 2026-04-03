import express from "express";
import Freelancer from "../models/Freelancer.js";

const router = express.Router();


// =======================================
// 🔵 GET ALL FREELANCERS
// =======================================

router.get("/", async (req, res) => {
  try {
    const freelancers = await Freelancer.find().sort({ createdAt: -1 });

    res.json({
      message: "Freelancers retrieved successfully",
      count: freelancers.length,
      freelancers,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// =======================================
// 🔵 GET FREELANCERS BY CATEGORY
// =======================================

router.get("/category/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;

    const freelancers = await Freelancer.find({
      category: { $regex: new RegExp("^" + categoryName + "$", "i") },
    });

    res.json(freelancers);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// =======================================
// 🔵 GET FREELANCERS BY LOCATION
// =======================================

router.get("/location", async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    const cleanCity = city.trim().toLowerCase();

    console.log("Searching city:", cleanCity);

    const freelancers = await Freelancer.find({
      city: { $regex: cleanCity, $options: "i" }
    });

    res.json(freelancers);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// =======================================
// 🔵 SEARCH BY CITY + PINCODE
// =======================================

router.get("/search", async (req, res) => {
  try {
    const { city, pincode } = req.query;

    if (!city || !pincode) {
      return res
        .status(400)
        .json({ message: "City and pincode are required" });
    }

    const freelancers = await Freelancer.find({
      city: { $regex: new RegExp(city, "i") },
      pincode,
    });

    res.json(freelancers);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// =======================================
// ⭐ CHATBOT ROUTE
// GET FREELANCERS BY NAMES
// =======================================

router.post("/by-names", async (req, res) => {
  try {

    const { names } = req.body;

    if (!names || names.length === 0) {
      return res.json([]);
    }

    const freelancers = await Freelancer.find({
      name: { $in: names }
    });

    res.json(freelancers);

  } catch (error) {

    console.error("Error fetching freelancers by names:", error);

    res.status(500).json({
      message: "Failed to fetch freelancers",
    });
  }
});


// =======================================
// 🔵 CREATE FREELANCER
// =======================================

router.post("/", async (req, res) => {
  try {

    const freelancer = new Freelancer(req.body);

    const savedFreelancer = await freelancer.save();

    res.status(201).json(savedFreelancer);

  } catch (error) {

    console.error("Error saving freelancer:", error);

    res.status(500).json({
      message: "Server error while saving freelancer",
    });
  }
});


// =======================================
// 🔵 GET SINGLE FREELANCER
// =======================================

router.get("/:id", async (req, res) => {
  try {

    const freelancer = await Freelancer.findById(req.params.id);

    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    res.json(freelancer);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching freelancer",
    });
  }
});


// =======================================
// 🟡 UPDATE FREELANCER
// =======================================

router.put("/:id", async (req, res) => {
  try {

    const freelancer = await Freelancer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    res.json(freelancer);

  } catch (error) {

    res.status(500).json({
      message: "Failed to update freelancer",
    });
  }
});


// =======================================
// 🔴 DELETE FREELANCER
// =======================================

router.delete("/:id", async (req, res) => {
  try {

    const freelancer = await Freelancer.findByIdAndDelete(req.params.id);

    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    res.json({
      message: "Freelancer deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete freelancer",
    });
  }
});


export default router;