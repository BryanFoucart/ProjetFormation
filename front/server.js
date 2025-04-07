const express = require("express");
const helmet = require("helmet");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
require("dotenv").config();
const { fetchData } = require("./public/assets/js/lib/functions.js");
app.set("view engine", "ejs");

const images = fetchData({
  api: "https://api.unsplash.com",
  route: "/photos",
  options: {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_CLIENT_ID}`,
    },
    params: { per_page: 50 },
  },
}).then((data) => {
  return data;
});

app.use(express.static(path.join(__dirname, "public"))); // => /front/public/

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(express.json());

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

// envoie messages
app.post("/contact", async (req, res) => {
  console.log(req.body);
  const { name, email, subject, message } = req.body;
  const htmlContent = `<h1>Nouveau message de contact</h1>
  <p><strong>Nom :</strong>${name}</p>
  <p><strong>Email :</strong>${email}</p>
  <p><strong>Subject :</strong>${subject}</p>
  <p><strong>Message :</strong>${message}</p>`;

  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure, // port 465
      auth: {
        user: testAccount.user, // contact@monsite.com;
        pass: testAccount.pass,
      },
      tls: {
        rejectUnauthorized: false, // autorise tout, à enlever en prod
      },
    });

    let mailOptions = {
      from: `"Contact My Crypto" <${email}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: subject,
      html: htmlContent,
    };

    let info = await transporter.sendMail(mailOptions);

    console.log("Message envoyé: %s", info.messageId);
    console.log(
      "URL de prévisualisation : %s",
      nodemailer.getTestMessageUrl(info)
    );

    res.status(200).json({
      message: "Votre message a été envoyé avec succès",
      previewUrl: nodemailer.getTestMessageUrl(info),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Erreur lors de l'envoie du mail",
    });
  }
});
