import { Router } from "express";
import { displayMemberForm, displaySignUpPage, submitSignupForm } from "../controllers/sign-upController.js";
import displayMessages from "../controllers/homePageController.js";

// Initialize router
const router = Router();

// GET request to display homepage with messages
router.get("/", displayMessages);

// GET request to display sign-up page
router.get("/sign-up", displaySignUpPage);

// POST request to submit sign-up form
router.post("/sign-up", submitSignupForm);

// GET request to display secret passcode page

router.get("/passcode", displayMemberForm);

export { router };
