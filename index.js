import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connect.db.js";
import taskRoutes from "./routes/task.route.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/task", taskRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connectDb();
  console.log(`server runing on: http://localhost:${port}`);
});
