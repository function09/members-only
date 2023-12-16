import { Router } from "express";
import displaySignUpPage from "../controllers/sign-upController.js";
import displayMessages from "../controllers/homePageController.js";

// Initialize router
const router = Router();

// GET request to display homepage with messages
router.get("/", displayMessages);

// GET request to display sign-up page
router.get("/sign-up", displaySignUpPage);

export { router };
