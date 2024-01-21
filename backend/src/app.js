// import some node modules for later

const fs = require("node:fs");
const path = require("node:path");

// create express app

const express = require("express");

const app = express();

// use some application-level middlewares

app.use(express.json());

const cors = require("cors");

// const corsOptions = {
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
//   allowedHeaders: "Content-Type, Authorization", // Add any other headers you need
// };

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// import and mount the API routes

const userRouter = require("./routers/UserRouter");
const postRouter = require("./routers/PostRouter");
const eventRouter = require("./routers/EventRouter");
const surveyRouter = require("./routers/SurveyRouter");
const postCommentsRouter = require("./routers/PostCommentsRouter");
const eventCommentsRouter = require("./routers/EventCommentsRouter");
const eventCommentsLikesRouter = require("./routers/EventCommentsLikesRouter");
const surveyCommentsRouter = require("./routers/SurveyCommentsRouter");
const individualchatRouter = require("./routers/IndividualchatRouter");

app.use(userRouter);
app.use(postRouter);
app.use(eventRouter);
app.use(surveyRouter);
app.use(postCommentsRouter);
app.use(eventCommentsRouter);
app.use(eventCommentsLikesRouter);
app.use(surveyCommentsRouter);
app.use(individualchatRouter);

// serve the `backend/public` folder for public resources
app.use("/upload", express.static(path.join(__dirname, "../assets/upload")));
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
