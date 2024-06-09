import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRoute from "./route/authRoute.js"
import categoryRoute from "./route/categoryRoute.js"
import productRoute from "./route/productRoute.js"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
//dotenv configuration
dotenv.config()

//database configuration
connectDB()

//esmodule fixed
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

//express app
const app = express();
const PORT = process.env.PORT


//middleware
app.use(express.json());
app.use(cors())
app.use(path.join(__dirname, "../client/build"))

//api test
app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

//routes
app.use("/api/v1/user", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

//app listening port
app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})
