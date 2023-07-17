require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { modelMiddleware } = require("./middleware/userModel.js");
const { jwtVerify } = require("./middleware/jwtVerify");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const dbConnection = async () => {
  await mongoose.connect(process.env.DB_URL);
};
dbConnection();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${process.env.FRONTEND_URL}`);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.post("/signup", modelMiddleware, async (req, res) => {
  const { username, password } = req.body;
  const encPass = await bcryptjs.hash(password, 8);
  const arr = await res.locals.userModel.find({ username: username }).exec();
  if (arr.length === 0) {
    await res.locals.userModel.create({
      username: username,
      password: encPass,
      notes: new Array(),
    });
    const a = await res.locals.userModel.find({ username: username }).exec();
    const token = jwt.sign(
      {
        id: a[0]._id,
        username: username,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({ username });
  } else res.sendStatus(409);
});

app.post("/login", modelMiddleware, async (req, res) => {
  const { username, password } = req.body;
  const arr = await res.locals.userModel.find({ username: username }).exec();
  if (arr.length !== 0) {
    const b = await bcryptjs.compare(password, arr[0].password);
    if (b) {
      const token = jwt.sign(
        {
          id: arr[0]._id,
          username: username,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.json({ username });
    } else {
      res.json({ error: "wrong password" });
    }
  } else res.sendStatus(404);
});

app.post("/createnote", modelMiddleware, jwtVerify, async (req, res) => {
  const { notes } = req.body;
  const username = req.username;
  const oldNotes = await res.locals.userModel
    .find({ username: username })
    .exec();
  const update = await res.locals.userModel.updateOne(
    { username: username },
    {
      notes: [...oldNotes[0].notes, notes],
    }
  );
  if (update.modifiedCount === 1) res.json({ notes: notes });
  else res.json({ error: "note is note updated" });
});

app.get("/notes", modelMiddleware, jwtVerify, async (req, res) => {
  const user = await res.locals.userModel
    .find({ username: req.username })
    .exec();
  res.json(user[0].notes);
});

app.delete("/delete", modelMiddleware, jwtVerify, async (req, res) => {
  const { heading, text } = req.body;
  const username = req.username;
  const oldNotes = await res.locals.userModel
    .find({ username: username })
    .exec();
  const list = oldNotes[0].notes;
  const index = list.findIndex(
    (note) => note.heading === heading && note.text === text
  );
  const delNote = list.splice(index, 1);
  const del = await res.locals.userModel.updateOne(
    { username: username },
    {
      notes: [...list],
    }
  );
  if (del.modifiedCount === 1) res.json(delNote);
  else res.json({ error: "note is not updated" });
});

app.get("/logout", jwtVerify, (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
  });
  res.send({ success: true });
});

app.listen(process.env.PORT, () =>
  console.log(`Server is listening at port ${process.env.PORT}....`)
);
