const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/api/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const apiUrl = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
