require("dotenv").config();
const express = require("express");
const router = require("./routes");

const app = express();

app.use(express.json());
app.use(router);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
