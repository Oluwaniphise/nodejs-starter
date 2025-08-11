const express = require("express");
const bordyParser = require("body-parser");
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://enoch:r1xLzMnNG1eMnmzW@cluster0.h6hfh2e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(bordyParser.json());

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

mongoose
  .connect(uri)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
