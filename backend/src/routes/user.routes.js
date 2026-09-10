import { Router } from "express";
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getCurrentUser, 
    refreshAccessToken 
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
    "/register",
    registerUser
);


router.post(
    "/login", 
    loginUser
);


router.post(
    "/refresh-token", 
    refreshAccessToken
);


router.post(
    "/logout", 
    verifyJWT, 
    logoutUser
);


router.get(
    "/me", 
    verifyJWT, 
    getCurrentUser
);


export default router;