import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";

const morgan = require("morgan");
require("dotenv").config();

const app = express();

//Database
mongoose
    .set('strictQuery', false)
    .connect(process.env.DATABASE)
    .then(() => {
        console.log("DB connected")
    })
    .catch((err) => {
        console.log("DB Error => ", err)
});

app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({
    origin: ["http://localhost:3000"],
    optionSuccessStatus: 200
}));

// Automatically load all routes based on filename from routes directory
readdirSync("./routes").map((r) => {
    app.use("/api", require(`./routes/${r}`));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {console.log(`Server running on port ${port}`)});