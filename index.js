import dotenv from "dotenv";
import express from "express";

//importing routers
import clientRouter from "./routes/client.js";
import loginRouter from "./routes/login.js";

//using env variables
dotenv.config();
const PORT = process.env.PORT || 3000;

const expressApp = express();

//defining middlewares
expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use(express.urlencoded({extended: true}));



expressApp.use("/client", clientRouter);

expressApp.use("/login", loginRouter);

expressApp.use("/", (req, res) => {
    res.send("Rapimoney web services")
})

expressApp.listen(PORT, () =>
  console.log(`Web service running on http://localhost:${PORT}`)
);