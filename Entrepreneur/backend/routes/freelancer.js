// routes/freelancer.js
import express from "express";
import Project from "../models/Project.js";
import { authMiddleware } from "../middleware/auth.js";
import Freelancer from "../models/Freelancer.js";
import { fetchLinkedinPeople } from "../services/linkedinService.js";

const router = express.Router();

// Become a Freelancer
router.post("/become", authMiddleware, async (req, res) => {
  try {
    req.user.role = "freelancer";
    await req.user.save();
    res.json({ success: true, message: "User upgraded to Freelancer", user: req.user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});




router.get("/location", async (req, res) => {
  try {
    const { city } = req.query;

    const dbFreelancers = await Freelancer.find({
      city: { $regex: city, $options: "i" }
    });

    // 🔵 get linkedin freelancers
    let linkedinFreelancers = [];

    try {
      const response = await axios.get(
        `http://127.0.0.1:5001/linkedin/${city}`
      );
      linkedinFreelancers = response.data;
    } catch (err) {
      console.log("LinkedIn API failed");
    }

    res.json({
      platformFreelancers: dbFreelancers,
      suggestedFreelancers: linkedinFreelancers
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get Freelancer Projects
router.get("/projects", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ freelancer: req.user._id });
    res.json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add a Completed Project
router.post("/projects", authMiddleware, async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      freelancer: req.user._id
    });
    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// GET freelancer by email
router.get("/by-email/:email", async (req, res) => {
  const freelancer = await Freelancer.findOne({ email: req.params.email });
  if (!freelancer) return res.status(404).json({ message: "Freelancer not found" });
  res.json(freelancer);
});

// GET bookings by freelancer ID
router.get("/freelancer/:freelancerId", async (req, res) => {
  const bookings = await Booking.find({ freelancerId: req.params.freelancerId });
  res.json(bookings);
});

export default router;
