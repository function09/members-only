import { Router } from "express";
import {
  changeMembershipStatus,
  displayMemberForm,
  displaySignUpPage,
  submitSignupForm,
} from "../controllers/sign-upController.js";
import displayMessages from "../controllers/homePageController.js";
import { displayLogInForm, logIn } from "../controllers/loginController.js";
import { displayMessageForm, createMessage } from "../controllers/createMessageController.js";

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

// POST request to submit secret passcode
router.post("/passcode", changeMembershipStatus);

// GET request to display login page
router.get("/log-in", displayLogInForm);

// POST request to display login page
router.post("/log-in", logIn);

// GET request to display create message form
router.get("/create-message", displayMessageForm);

// POST request to post new message
router.post("/create-message", createMessage);

export { router };
