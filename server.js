`use strict`;
const express = require("express");
const PORT = 5000;
const app = express();
//body-parser 는 4.16이후 방식
app.use(express.json());
const router1 = require("./router");
app.use("/api/1", router1);

// app.get("/", (req, res) => {
//   res.send("response success");
// });

app.listen(PORT);
console.log(`Server opned in PORT:${PORT}`);
