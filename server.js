const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
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
    current_date: days[date.getUTCDay()],
    utc_time: date,
    track,
    status_code: 200,
    github_file_url:
      "https://github/chisomchris/hngx-be-t1/blob/main/server.js",
    github_repo_url: "https://github/chisomchris/hngx-be-t1",
  });
});

app.listen(PORT, () => {
  console.log(`app running`);
});
