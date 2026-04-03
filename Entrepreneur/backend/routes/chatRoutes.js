import express from "express";
import axios from "axios";
import Freelancer from "../models/Freelancer.js";

const router = express.Router();

function extractFreelancerNames(text) {
  const regex = /Name:\s*(.*)/g;
  const names = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    names.push(match[1].trim());
  }

  return names;
}

router.post("/", async (req, res) => {

  try {

    const { message } = req.body;

    const pythonResponse = await axios.post(
      process.env.PYTHON_API_URL,
      { message },
      {
        headers: {
          "x-api-key": process.env.PYTHON_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const data = pythonResponse.data;

    if (data.freelancer_answer) {

      const names = extractFreelancerNames(data.freelancer_answer);

      console.log("Extracted freelancer names:", names);

      const freelancers = await Freelancer.find({
        name: { $in: names }
      });

      return res.json({
        freelancers
      });
    }

    if (data.general_answer) {
      return res.json({
        message: data.general_answer
      });
    }

    if (data.support_answer) {
      return res.json({
        message: data.support_answer
      });
    }

  } catch (error) {

    console.error("Python API error:", error.message);

    res.status(500).json({
      error: "Chatbot service unavailable"
    });
  }

});

export default router;