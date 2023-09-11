require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./utils/connectDB");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./routes/persons"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ message: "404 Not found" });
  } else if (req.accepts("html")) {
    res.send("404 Not found");
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendStatus(500);
});

if (process.env.NODE_ENV === "production") {
  connect().then((connection) => {
    if (connection) {
      app.listen(PORT, () => {
        console.log(`app running`);
      });
    }
  });
}

if (process.env.NODE_ENV === "test") {
  module.exports = { app };
}
