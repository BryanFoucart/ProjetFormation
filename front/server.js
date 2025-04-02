import { fetchData } from "./public/assets/js/lib/functions.js";
const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();

app.set("view engine", "ejs");

const images = fetchData({
  route:
    "/games?key=db76511d21a143668bd090896650561f&dates=2019-09-01,2019-09-30&platforms=18,1,7",
}).then((data) => {
  return data.results;
});

app.use(express.static(path.join(__dirname, "public"))); // => /front/public/

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.get("/masonry", async (req, res) => {
  try {
    const imagesData = await images;
    console.log(imagesData);
    res.render("pages/masonry", { images: imagesData });
  } catch (err) {
    console.log(err);
    res.render("pages/masonry", { images: [] });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
