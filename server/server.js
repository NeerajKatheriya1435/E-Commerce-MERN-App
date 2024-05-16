import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRoute from "./route/authRoute.js"
import cors from "cors"
//dotenv configuration
dotenv.config()

//database configuration
connectDB()

//express app
const app = express();
const PORT = process.env.PORT

//api test
app.get("/", (req, res) => {
    res.status(200).send({ "message": "Welcome to E-Commerce website" })
})
//middleware
app.use(express.json());
app.use(cors())

app.use("/api/v1/user", authRoute);

//app listening port
app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})