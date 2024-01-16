// import some node modules for later

const fs = require("node:fs");
const path = require("node:path");

// create express app

const express = require("express");

const app = express();

// use some application-level middlewares

app.use(express.json());

const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

// import and mount the API routes

const userRouter = require("./routers/UserRouter");

app.use(userRouter);

const postRouter = require("./routers/PostRouter");

app.use(postRouter);

const eventRouter = require("./routers/EventRouter");

app.use(eventRouter);

const surveyRouter = require("./routers/SurveyRouter");

app.use(surveyRouter);

const eventCommentsRouter = require("./routers/EventCommentsRouter");

app.use(eventCommentsRouter);

const surveyCommentsRouter = require("./routers/SurveyCommentsRouter");

app.use(surveyCommentsRouter);

// serve the `backend/public` folder for public resources

app.use(express.static(path.join(__dirname, "../public")));

// serve REACT APP

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export

module.exports = app;
