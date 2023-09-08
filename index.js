const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const conversationRoutes = require("./routes/conversation");

PORT = 8800;
const app = express();

dotenv.config();
mongoose.set("strictQuery", false);

app.use(cors("*"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

main().then(() => console.log("DB Connection Successful"));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.use(express.json());

app.use("/api/auth", authRoutes);
// app.use("/api/conversation", conversationRoutes);

app.listen(PORT, () => console.log("Backend Server is Running on", PORT));
