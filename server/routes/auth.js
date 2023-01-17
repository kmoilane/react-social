import express from "express";

const router = express.Router();

// Middlewares
import { requireSignin } from "../middlewares";

// Controllers
import {
    register,
    login,
    currentUser,
    forgotPassword,
} from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignin, currentUser);
router.post("/forgot-password", forgotPassword);

module.exports = router;
