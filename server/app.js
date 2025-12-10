import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});


 