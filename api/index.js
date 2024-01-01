const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ws = require("ws");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const User = require("./models/user");

dotenv.config();
mongoose.connect(process.env.MONGODB_URL);
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/test", (req, res) => {
  res.json("success");
});

app.get("/profile", (req, res) => {
  const token = req.cookies?.token;

  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json("No token");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    const correctPassword = bcrypt.compareSync(password, existingUser.password);

    if (correctPassword) {
      jwt.sign(
        { userId: existingUser._id, username },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, { sameSite: "none", secure: true })
            .status(201)
            .json({
              id: existingUser._id,
            });
        }
      );
    }
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const newUser = await User.create({
      username: username,
      password: hashedPassword,
    });

    jwt.sign({ userId: newUser._id, username }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res
        .cookie("token", token, { sameSite: "none", secure: true })
        .status(201)
        .json({
          id: newUser._id,
        });
    });
  } catch (error) {
    if (error) throw error;
    res.status(500).json("error");
  }
});

const server = app.listen(4000);

const wss = new ws.WebSocketServer({server})

wss.on("connection", (connection, req) => {
  console.log(req.headers)
})