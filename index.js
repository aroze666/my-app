const { response } = require("express");
const express = require("express");
const { readFile } = require("fs");
const app = express();
app.get("/", (req, res) => {
  readFile("./index.html", "utf8", (err, html) => {
    if (err) {
      response.status(500).send("Error 500");
    }
    res.send(html);
  });
});
app.get("/primality.html", (req, res) => {
  readFile("./primality.html", "utf8", (err, html) => {
    if (err) {
      response.status(500).send("Error 500");
    }
    res.send(html);
  });
});
app.get("/collatz.html", (req, res) => {
  readFile("./collatz.html", "utf8", (err, html) => {
    if (err) {
      response.status(500).send("Error 500");
    }
    res.send(html);
  });
});
app.get("/music.html", (req, res) => {
  readFile("./music.html", "utf8", (err, html) => {
    if (err) {
      response.status(500).send("Error 500");
    }
    res.send(html);
  });
});
app.use("/src", express.static("./src/"));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(port);
});
