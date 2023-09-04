const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connect to MongoDB (you need to have MongoDB running locally or provide a connection URL)
mongoose.connect("mongodb://localhost/credit_wallet", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User model
const User = mongoose.model("User", {
  username: String,
  password: String,
  balance: Number,
});

// Register a new user
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ username, password: hashedPassword, balance: 0 });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error registering user." });
  }
});

// Login and get JWT
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed." });
    }

    const token = jwt.sign({ userId: user._id }, "secret_key", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error authenticating user." });
  }
});

// Protect routes with authentication middleware
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).json({ error: "Authentication token missing." });

  jwt.verify(token, "secret_key", (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token." });
    req.user = user;
    next();
  });
}

// Load credit into user's wallet
app.post("/load-credit", authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const amount = req.body.amount;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found." });

    user.balance += amount;
    await user.save();
    res.json({ message: "Credit loaded successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error loading credit." });
  }
});

// Get user's wallet balance
app.get("/balance", authenticateToken, async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found." });

    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: "Error fetching balance." });
  }
});

// Make a transaction
app.post("/transaction", authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const { amount } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found." });

    if (user.balance < amount)
      return res.status(400).json({ error: "Insufficient balance." });

    user.balance -= amount;
    await user.save();

    // Record the transaction in a separate model (not implemented in this example)
    // const transaction = new Transaction({ userId, amount });
    // await transaction.save();

    res.json({ message: "Transaction successful." });
  } catch (error) {
    res.status(500).json({ error: "Error processing transaction." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
