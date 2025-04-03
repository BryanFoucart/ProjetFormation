const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const { fetchData } = require("./public/assets/js/lib/functions.js");
app.set("view engine", "ejs");

const images = fetchData({
  //api: "https://api.rawg.io/api",
  //route: "/games",
  api: "https://api.unsplash.com", // UNSPLASH
  route: "/photos", // UNSPLASH
  options: {
    headers: {
      //Authorization: `Client-ID ${process.env.RAWG_CLIENT_ID}`,
      Authorization: `Client-ID ${process.env.UNSPLASH_CLIENT_ID}`, // UNSPLASH
    },
    params: { per_page: 50 },
  },
}).then((data) => {
  //return data.results;
  return data; // || Si UNSPLASH_CLIENT_ID au lieu de data.results
});

app.use(express.static(path.join(__dirname, "public"))); // => /front/public/

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.get("/galerie", async (req, res) => {
  try {
    const imagesData = await images;
    console.log(imagesData);
    res.render("pages/galerie", { images: imagesData });
  } catch (err) {
    console.log(err);
    res.render("pages/galerie", { images: [] });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
