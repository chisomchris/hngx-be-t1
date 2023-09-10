const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;
  if (!slack_name || !track) {
    return res.status(400).json({
      message: "Missing slack_name or track query parameters",
    });
  }
  const days = [
    "Sunday",
    "Monday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  res.status(200).json({
    slack_name,
    current_day: days[date.getUTCDay()],
    utc_time: date.toISOString().split(".")[0] + "Z",
    track,
    status_code: 200,
    github_file_url:
      "https://github.com/chisomchris/hngx-be-t1/blob/main/server.js",
    github_repo_url: "https://github.com/chisomchris/hngx-be-t1",
  });
});

app.listen(PORT, () => {
  console.log(`app running`);
});
