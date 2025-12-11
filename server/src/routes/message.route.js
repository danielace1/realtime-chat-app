import express from "express";

const router = express.Router();

router.post("/send", (req, res) => {
  // Handle sending a message
  res.send("Message sent");
});

export default router;
