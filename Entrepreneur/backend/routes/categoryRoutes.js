import express from "express";
import Category from "../models/categoryModel.js";

const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// POST category (for testing)
router.post("/", async (req, res) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
    });

    const saved = await newCategory.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error adding category" });
  }
});

export default router;