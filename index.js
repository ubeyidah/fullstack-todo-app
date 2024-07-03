import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connect.db.js";
dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connectDb();
  console.log(`server runing on: http://localhost:${port}`);
});
