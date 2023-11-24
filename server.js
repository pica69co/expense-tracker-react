import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import transactions from "./routes/transactions.js";
import connectDB from "./config/db.js";
dotenv.config({ path: "./config/config.env" });
const app = express();
connectDB();
const port = process.env.PORT || 5000;
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/transactions", transactions);

app.listen(5000, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode:port ${port}`.bgYellow.bold
  );
});
