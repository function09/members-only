import bodyParser from "body-parser";
import { Router } from "express";
import { test } from "../controllers/controller.js";

// Initialize router
const router = Router();

// Requests
router.get("/", test);

export { router };
