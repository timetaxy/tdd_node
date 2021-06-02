`use strict`;
const env = require("./.env");
console.log(env);
const express = require("express");
const PORT = 5000;
const app = express();

//body-parser 는 4.16이후 방식
app.use(express.json());

const router1 = require("./router");
app.use("/api/1", router1);

const mongo = require("mongoose");
mongo
  .connect(env.mongo.uri, { useNewUrlParser: true })
  .then(() => {
    console.log("mongo arrived");
  })
  .catch((err) => console.log(err));

// app.get("/", (req, res) => {
//   res.send("response success");
// });

app.listen(PORT);
console.log(`Server opened in PORT:${PORT}`);
