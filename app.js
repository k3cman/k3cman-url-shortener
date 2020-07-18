const express = require("express");

const app = express();
app.use(express.static("public"));
app.use(express.json());
// POST request
app.post("/generate", (req, res) => {
  let { handle, url } = req.body;
  res.json({
    handle,
    url,
  });
});

// GET request
app.get("/:handle", (req, res) => {
  res.redirect("http://kecman.dev");
});

// Start server
const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
