// 3rd Party Modules
import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import { router } from "./routes/routes.js";

// To use __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup MongoDB Connection through Mongoose
mongoose.set("strictQuery", "false");
const { mongoDB } = process.env;

async function connect() {
  await mongoose.connect(mongoDB);
}

connect().catch((err) => console.log(err));

// Server Initialization
const app = express();
const { PORT } = process.env;

// Setup view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(express.json());
app.use(session({ secret: "felines", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));

// Routes
app.use("/", router);

// Listen on server
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is running and listening on port: ${PORT}`);
  } else {
    console.log("Error occured, server can't start", err);
  }
});
