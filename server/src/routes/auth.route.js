import expresss from "express";

const router = expresss.Router();

router.get("/signup", (req, res) => {
  // Handle user registration
  res.send("User registered");
});

router.get("/login", (req, res) => {
  // Handle user login
  res.send("User logged in");
});

router.post("/logout", (req, res) => {
  // Handle user logout
  res.send("User logged out");
});

export default router;
